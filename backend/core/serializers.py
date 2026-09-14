from rest_framework import serializers
from .models import Skill, ExperienceItem, ExperienceBullet, EducationItem, Project, ProjectHighlight, Stat


class ExperienceBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceBullet
        fields = ["id", "text", "order"]


class ExperienceItemSerializer(serializers.ModelSerializer):
    bullets = ExperienceBulletSerializer(many=True, read_only=True)

    class Meta:
        model = ExperienceItem
        fields = ["id", "company", "role", "location", "period", "order", "bullets"]


class EducationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationItem
        fields = ["id", "institution", "credential", "location", "period", "note", "order"]


class ProjectHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectHighlight
        fields = ["id", "label", "text", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    highlights = ProjectHighlightSerializer(many=True, read_only=True)
    stack_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            "id", "number", "title", "tagline", "live_url", "repo_url", "docs_url",
            "stack", "stack_list", "featured", "order", "highlights",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "order"]


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["id", "label", "value", "order"]
