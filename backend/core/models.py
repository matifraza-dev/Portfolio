from django.db import models


class SkillCategory(models.TextChoices):
    LANGUAGES = "languages", "Languages"
    FRONTEND = "frontend", "Frontend"
    BACKEND = "backend", "Backend"
    DATABASE = "database", "Database"
    DEVOPS = "devops", "DevOps & Tools"
    PROJECT_MGMT = "project_mgmt", "Project Management"


class Skill(models.Model):
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=20, choices=SkillCategory.choices)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return self.name


class ExperienceItem(models.Model):
    company = models.CharField(max_length=120)
    role = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    period = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.role} @ {self.company}"


class ExperienceBullet(models.Model):
    experience = models.ForeignKey(ExperienceItem, related_name="bullets", on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text[:60]


class EducationItem(models.Model):
    institution = models.CharField(max_length=160)
    credential = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    period = models.CharField(max_length=60)
    note = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.credential} - {self.institution}"


class Project(models.Model):
    number = models.PositiveIntegerField(help_text="Case-study sequence number, e.g. 01, 02")
    title = models.CharField(max_length=160)
    tagline = models.CharField(max_length=220, blank=True)
    live_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    docs_url = models.URLField(blank=True)
    stack = models.CharField(max_length=400, help_text="Comma-separated tech stack")
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

    @property
    def stack_list(self):
        return [s.strip() for s in self.stack.split(",") if s.strip()]


class ProjectHighlight(models.Model):
    project = models.ForeignKey(Project, related_name="highlights", on_delete=models.CASCADE)
    label = models.CharField(max_length=60, help_text="e.g. Architecture, Backend, Frontend, DevOps")
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.label}: {self.text[:40]}"


class Stat(models.Model):
    """Small proof-point numbers shown in the About section, e.g. '2+ years'."""
    label = models.CharField(max_length=80)
    value = models.CharField(max_length=40)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.value} {self.label}"
