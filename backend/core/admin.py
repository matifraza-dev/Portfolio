from django.contrib import admin
from .models import (
    Skill, ExperienceItem, ExperienceBullet, EducationItem,
    Project, ProjectHighlight, Stat,
)


class ExperienceBulletInline(admin.TabularInline):
    model = ExperienceBullet
    extra = 1


@admin.register(ExperienceItem)
class ExperienceItemAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "period", "order")
    inlines = [ExperienceBulletInline]


class ProjectHighlightInline(admin.TabularInline):
    model = ProjectHighlight
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("number", "title", "featured", "order")
    inlines = [ProjectHighlightInline]


admin.site.register(Skill)
admin.site.register(EducationItem)
admin.site.register(Stat)
