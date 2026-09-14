from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .scraper import fetch, score_seo, FetchError


class SEOCheckerView(APIView):
    """Real, live on-page SEO analysis for a single URL."""

    def post(self, request):
        url = request.data.get("url", "")
        try:
            data = fetch(url)
        except FetchError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        result = score_seo(data)
        return Response({"page": data, **result})


class SitePerformanceView(APIView):
    """
    Honest alternative to a fake 'website traffic' number: we don't have
    access to any real visitor-analytics data source, so instead this
    measures the technical signals that actually affect how well a site
    can attract and hold traffic — load time, page weight, and
    crawlability — and says so plainly.
    """

    def post(self, request):
        url = request.data.get("url", "")
        try:
            data = fetch(url)
        except FetchError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        if data["response_time_ms"] < 600:
            speed_rating = "Fast"
        elif data["response_time_ms"] < 1500:
            speed_rating = "Moderate"
        else:
            speed_rating = "Slow"

        if data["page_size_kb"] < 500:
            weight_rating = "Lightweight"
        elif data["page_size_kb"] < 2000:
            weight_rating = "Average"
        else:
            weight_rating = "Heavy"

        crawlability = sum([data["has_robots_txt"], data["has_sitemap_xml"], data["has_canonical_tag"]])

        return Response({
            "page": data,
            "disclaimer": "This is a technical health read-out, not a visitor-traffic estimate — "
                           "real traffic numbers require access to analytics data we don't have for a third-party site.",
            "speed_rating": speed_rating,
            "weight_rating": weight_rating,
            "crawlability_score": crawlability,
            "crawlability_max": 3,
        })


class CompetitorAnalysisView(APIView):
    """Runs the same real analysis on two URLs and returns them side by side."""

    def post(self, request):
        url_a = request.data.get("url_a", "")
        url_b = request.data.get("url_b", "")
        try:
            data_a = fetch(url_a)
            data_b = fetch(url_b)
        except FetchError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        score_a = score_seo(data_a)
        score_b = score_seo(data_b)

        return Response({
            "site_a": {"page": data_a, **score_a},
            "site_b": {"page": data_b, **score_b},
        })
