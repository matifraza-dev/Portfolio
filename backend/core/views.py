from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Skill, ExperienceItem, EducationItem, Project, Stat
from .serializers import (
    SkillSerializer, ExperienceItemSerializer, EducationItemSerializer,
    ProjectSerializer, StatSerializer,
)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.prefetch_related("highlights").all()
    serializer_class = ProjectSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ExperienceItem.objects.prefetch_related("bullets").all()
    serializer_class = ExperienceItemSerializer


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EducationItem.objects.all()
    serializer_class = EducationItemSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


@api_view(["GET"])
def resume_bundle(request):
    """Single call the frontend uses to hydrate the whole page on load."""
    return Response({
        "stats": StatSerializer(Stat.objects.all(), many=True).data,
        "skills": SkillSerializer(Skill.objects.all(), many=True).data,
        "experience": ExperienceItemSerializer(
            ExperienceItem.objects.prefetch_related("bullets").all(), many=True
        ).data,
        "education": EducationItemSerializer(EducationItem.objects.all(), many=True).data,
        "projects": ProjectSerializer(
            Project.objects.prefetch_related("highlights").all(), many=True
        ).data,
    })
