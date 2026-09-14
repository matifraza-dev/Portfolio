from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, ExperienceViewSet, EducationViewSet, SkillViewSet,
    StatViewSet, resume_bundle,
)

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("education", EducationViewSet, basename="education")
router.register("skills", SkillViewSet, basename="skill")
router.register("stats", StatViewSet, basename="stat")

urlpatterns = [
    path("bundle/", resume_bundle, name="resume-bundle"),
    path("", include(router.urls)),
]
