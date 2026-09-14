"""
Real, dependency-light on-page analysis. No third-party paid APIs, no
fabricated numbers — every figure returned here is measured directly
from the page (or from robots.txt / sitemap.xml) at request time.
"""
import time
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

TIMEOUT = 8
HEADERS = {"User-Agent": "AtifRazaPortfolioBot/1.0 (+site-analysis-tool)"}


class FetchError(Exception):
    pass


def _normalize_url(url: str) -> str:
    url = url.strip()
    if not url:
        raise FetchError("Please provide a URL.")
    if not url.startswith(("http://", "https://")):
        url = f"https://{url}"
    parsed = urlparse(url)
    if not parsed.netloc:
        raise FetchError("That doesn't look like a valid URL.")
    return url


def fetch(url: str) -> dict:
    url = _normalize_url(url)
    start = time.perf_counter()
    try:
        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT, allow_redirects=True)
    except requests.exceptions.RequestException as exc:
        raise FetchError(f"Could not reach {url}: {exc.__class__.__name__}")
    elapsed_ms = round((time.perf_counter() - start) * 1000)

    soup = BeautifulSoup(resp.text, "html.parser")
    parsed = urlparse(resp.url)

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    meta_desc_tag = soup.find("meta", attrs={"name": "description"})
    meta_description = meta_desc_tag.get("content", "").strip() if meta_desc_tag else ""
    viewport_tag = soup.find("meta", attrs={"name": "viewport"})
    canonical_tag = soup.find("link", attrs={"rel": "canonical"})

    h1s = soup.find_all("h1")
    imgs = soup.find_all("img")
    imgs_missing_alt = [img for img in imgs if not img.get("alt", "").strip()]

    text = soup.get_text(separator=" ", strip=True)
    word_count = len(text.split())

    links = soup.find_all("a", href=True)
    internal, external = 0, 0
    for a in links:
        href = a["href"]
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            continue
        joined = urljoin(resp.url, href)
        if urlparse(joined).netloc == parsed.netloc:
            internal += 1
        else:
            external += 1

    robots_ok, sitemap_ok = False, False
    try:
        robots_resp = requests.get(urljoin(resp.url, "/robots.txt"), headers=HEADERS, timeout=TIMEOUT)
        robots_ok = robots_resp.status_code == 200 and "user-agent" in robots_resp.text.lower()
    except requests.exceptions.RequestException:
        pass
    try:
        sitemap_resp = requests.get(urljoin(resp.url, "/sitemap.xml"), headers=HEADERS, timeout=TIMEOUT)
        sitemap_ok = sitemap_resp.status_code == 200
    except requests.exceptions.RequestException:
        pass

    return {
        "requested_url": url,
        "final_url": resp.url,
        "status_code": resp.status_code,
        "https": parsed.scheme == "https",
        "response_time_ms": elapsed_ms,
        "page_size_kb": round(len(resp.content) / 1024, 1),
        "title": title,
        "title_length": len(title),
        "meta_description": meta_description,
        "meta_description_length": len(meta_description),
        "has_viewport_tag": bool(viewport_tag),
        "has_canonical_tag": bool(canonical_tag),
        "h1_count": len(h1s),
        "h1_text": h1s[0].get_text(strip=True) if h1s else "",
        "image_count": len(imgs),
        "images_missing_alt": len(imgs_missing_alt),
        "word_count": word_count,
        "internal_link_count": internal,
        "external_link_count": external,
        "has_robots_txt": robots_ok,
        "has_sitemap_xml": sitemap_ok,
    }


def score_seo(data: dict) -> dict:
    """Transparent, rule-based scoring — each rule and why it fired is returned
    alongside the score so the result never reads as an unexplained black box."""
    checks = []

    def add(passed, label, detail):
        checks.append({"passed": passed, "label": label, "detail": detail})

    add(data["https"], "HTTPS", "Site is served over HTTPS." if data["https"] else "Site is not served over HTTPS.")
    add(0 < data["title_length"] <= 60, "Title tag length",
        f"Title is {data['title_length']} characters (aim for 1–60).")
    add(50 <= data["meta_description_length"] <= 160, "Meta description length",
        f"Meta description is {data['meta_description_length']} characters (aim for 50–160)."
        if data["meta_description_length"] else "No meta description found.")
    add(data["h1_count"] == 1, "Single H1", f"Page has {data['h1_count']} <h1> tag(s); exactly one is ideal.")
    add(data["images_missing_alt"] == 0, "Image alt text",
        "All images have alt text." if data["images_missing_alt"] == 0
        else f"{data['images_missing_alt']} of {data['image_count']} images are missing alt text.")
    add(data["word_count"] >= 300, "Content depth", f"Page has {data['word_count']} visible words.")
    add(data["has_viewport_tag"], "Mobile viewport tag",
        "Viewport meta tag present." if data["has_viewport_tag"] else "No viewport meta tag — mobile rendering may suffer.")
    add(data["has_canonical_tag"], "Canonical tag",
        "Canonical link present." if data["has_canonical_tag"] else "No canonical link tag found.")
    add(data["has_robots_txt"], "robots.txt", "robots.txt found." if data["has_robots_txt"] else "No robots.txt found at /robots.txt.")
    add(data["has_sitemap_xml"], "sitemap.xml", "sitemap.xml found." if data["has_sitemap_xml"] else "No sitemap.xml found at /sitemap.xml.")

    passed = sum(1 for c in checks if c["passed"])
    return {"score": passed, "max_score": len(checks), "checks": checks}
