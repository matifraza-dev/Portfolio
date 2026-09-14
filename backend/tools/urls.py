from django.urls import path
from .views import SEOCheckerView, SitePerformanceView, CompetitorAnalysisView

urlpatterns = [
    path("seo-checker/", SEOCheckerView.as_view(), name="tool-seo-checker"),
    path("site-performance/", SitePerformanceView.as_view(), name="tool-site-performance"),
    path("competitor-analysis/", CompetitorAnalysisView.as_view(), name="tool-competitor-analysis"),
]
