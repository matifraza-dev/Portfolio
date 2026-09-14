from django.core.management.base import BaseCommand
from core.models import (
    Skill, SkillCategory, ExperienceItem, ExperienceBullet,
    EducationItem, Project, ProjectHighlight, Stat,
)


class Command(BaseCommand):
    help = "Seed the database with Atif Raza's résumé content."

    def handle(self, *args, **options):
        self.stdout.write("Clearing existing content...")
        for model in [ProjectHighlight, Project, ExperienceBullet, ExperienceItem,
                      EducationItem, Skill, Stat]:
            model.objects.all().delete()

        self.stdout.write("Seeding stats...")
        for i, (label, value) in enumerate([
            ("years building production software", "2+"),
            ("backend performance improvement on a shipped project", "30%"),
            ("cold outreach contacts across 6 regions", "100+"),
            ("hours to first response from a public EU company", "14"),
        ]):
            Stat.objects.create(label=label, value=value, order=i)

        self.stdout.write("Seeding skills...")
        skill_map = {
            SkillCategory.LANGUAGES: ["Python", "JavaScript (ES6+)", "TypeScript", "PHP", "C++", "HTML5", "CSS3"],
            SkillCategory.FRONTEND: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Bootstrap",
                                      "TanStack Query", "Zustand", "react-hook-form", "Responsive Design",
                                      "Animated UI (Canvas, Scroll-Reveal)"],
            SkillCategory.BACKEND: ["Django", "Django REST Framework", "RESTful API Design",
                                     "JWT Authentication", "Role-Based Access Control", "pytest"],
            SkillCategory.DATABASE: ["PostgreSQL", "MySQL", "SQLite", "Django ORM"],
            SkillCategory.DEVOPS: ["Git", "GitHub", "Vercel CI/CD", "GitHub Actions (basic)"],
            SkillCategory.PROJECT_MGMT: ["Agile", "Scrum", "Sprint Planning", "Stakeholder Communication",
                                          "Cross-functional Coordination"],
        }
        for category, names in skill_map.items():
            for i, name in enumerate(names):
                Skill.objects.create(name=name, category=category, order=i)

        self.stdout.write("Seeding experience...")
        exp = ExperienceItem.objects.create(
            company="SoftTechHolic",
            role="Technical Project Coordinator & Full Stack Developer",
            location="Rawalpindi, Pakistan (Hybrid)",
            period="2023 — 2024",
            order=0,
        )
        for i, text in enumerate([
            "Led Agile sprint coordination for a 4-member cross-functional development team, managing task breakdown, milestone tracking, and on-time delivery across multiple concurrent workstreams.",
            "Translated complex business requirements into actionable technical specifications, reducing back-and-forth between stakeholders and developers by acting as the primary technical bridge.",
            "Proactively identified and resolved development blockers, maintaining sprint velocity and preventing timeline slippage across all project phases.",
            "Maintained async-first communication standards across the team, producing clear documentation, daily standups, and stakeholder status updates — skills directly applicable to distributed remote teams.",
            "Contributed full-stack development alongside coordination responsibilities, writing production-ready Python/Django backend code and JavaScript frontend components.",
        ]):
            ExperienceBullet.objects.create(experience=exp, text=text, order=i)

        self.stdout.write("Seeding education...")
        EducationItem.objects.create(
            institution="Virtual University of Pakistan",
            credential="Bachelor of Science in Computer Science",
            location="Wah Cantt, Pakistan",
            period="2025 — Present",
            note="Pursuing while actively working on professional projects and client outreach.",
            order=0,
        )
        EducationItem.objects.create(
            institution="Board of Intermediate & Secondary Education",
            credential="Intermediate — F.Sc Pre-Engineering",
            location="Wah Cantt, Pakistan",
            period="2021 — 2023",
            order=1,
        )
        EducationItem.objects.create(
            institution="Board of Intermediate & Secondary Education",
            credential="Matriculation — Science",
            location="Gujranwala Cantt, Pakistan",
            period="2019 — 2021",
            order=2,
        )

        self.stdout.write("Seeding projects...")

        p1 = Project.objects.create(
            number=1,
            title="SolidPrime — Multi-Tenant B2B Operations Dashboard",
            tagline="An operations platform that gives a B2B company one place to run customers, pipeline, projects, invoices, and tasks.",
            live_url="https://solid-prime-b2-b-product.vercel.app",
            repo_url="https://github.com/matifraza512-dot/SolidPrime-B2B-Product-",
            docs_url="https://matifraza512.pythonanywhere.com/api/docs/",
            stack="Python, Django, Django REST Framework, JWT, PostgreSQL, SQLite, pytest, React 19, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand, Vercel, PythonAnywhere, Git",
            featured=True,
            order=0,
        )
        for i, (label, text) in enumerate([
            ("Architecture", "Full-stack, multi-tenant B2B operations platform built module by module — Django REST Framework backend, React 19/TypeScript/Vite frontend. Every backend module pytest-tested before its frontend was wired up."),
            ("Backend", "11 production modules (Auth, Customers, Sales Pipeline, Projects, Invoices, Tasks, Notifications, Audit Log, Integrations, Settings, Dashboard). JWT authentication, role-based access control (Admin/Manager/Employee), organization-scoped querysets for tenant isolation, and an object-level permission class as a defense-in-depth backstop."),
            ("Frontend", "TypeScript, TanStack Query for server state, Zustand for persisted auth state, react-hook-form + zod for validation, and an axios interceptor for automatic JWT refresh."),
            ("Reliability engineering", "Root-caused a production 500 error to a missing NOT NULL constraint; fixed it with a custom UserManager and a database migration, plus added exception logging so server errors are never silently swallowed. Fixed a stale-permissions bug with a live session sync on every app load."),
            ("DevOps", "Frontend on Vercel, backend on PythonAnywhere, zero recurring cost, zero payment method required. GitHub as single source of truth for both repos."),
        ]):
            ProjectHighlight.objects.create(project=p1, label=label, text=text, order=i)

        p2 = Project.objects.create(
            number=2,
            title="Personal Portfolio — Full Stack Web Application",
            tagline="This site: a Django API behind a hand-built animated frontend, shipped with zero-downtime CI/CD.",
            live_url="https://portfolio-6cqm.vercel.app",
            repo_url="https://github.com/matifraza512-dot",
            stack="Python, Django, Django REST Framework, JWT, PostgreSQL, React 19, Vite, JavaScript (ES6+), HTML5, CSS3, Git, Vercel",
            featured=False,
            order=1,
        )
        for i, (label, text) in enumerate([
            ("Architecture", "Django REST API backend, with a React 19/Vite/TypeScript frontend replacing the original vanilla JS build — full-stack ownership from database to UI."),
            ("Backend", "5 production RESTful API endpoints (Contact, Projects, Posts, JWT Auth, Token Refresh) with JWT-based authentication, rate-limiting awareness, and a relational schema via Django ORM — PostgreSQL-ready for production, SQLite locally."),
            ("Frontend", "Animated particle canvas, custom cursor system, scroll-reveal animations, and a mobile-first responsive layout with client-side form validation."),
            ("DevOps", "Automated CI/CD deployment pipeline: GitHub push → Vercel build → live production, with zero-downtime deployments."),
        ]):
            ProjectHighlight.objects.create(project=p2, label=label, text=text, order=i)

        p3 = Project.objects.create(
            number=3,
            title="Coding the Brains — Office Attendance & Workforce Management Platform",
            tagline="A multi-tenant Django platform that replaced manual attendance sheets with role-based dashboards and face-recognition check-ins.",
            stack="Python, Django, Django ORM, Face Recognition, Role-Based Access Control, Multi-Tenant Architecture",
            featured=False,
            order=2,
        )
        for i, (label, text) in enumerate([
            ("Platform", "Multi-tenant Django web application for organizational attendance tracking, supporting role-based dashboards for Admins, Managers, Developers, Interns, and Clients."),
            ("Attendance engine", "Face-recognition-based attendance module alongside manual attendance entry, enabling automated employee check-ins and reducing reliance on manual record-keeping."),
            ("Access control", "Organization-scoped data access controls and custom permission decorators (@login_required, @role_required) enforcing strict role-based authorization across dashboard and attendance endpoints."),
            ("Sync", "Attendance data synchronization between HR and project-management modules, keeping attendance status consistent across manager dashboards and reporting views."),
            ("Hardening", "Authentication and authorization flows hardened through systematic security testing, including unauthenticated-access and cross-role permission checks."),
        ]):
            ProjectHighlight.objects.create(project=p3, label=label, text=text, order=i)

        p4 = Project.objects.create(
            number=4,
            title="Remote Client Outreach System",
            tagline="A structured B2B outreach pipeline, run like a project — not a mail-merge.",
            stack="Research, Segmentation, Cold Outreach, Business Development, Project Management",
            featured=False,
            order=3,
        )
        for i, (label, text) in enumerate([
            ("Pipeline", "Structured outreach pipeline targeting 100+ international e-commerce companies across 6 regions (USA, UK, Germany, France, Scotland, Washington State)."),
            ("Result", "First response within 14 hours from AboutYou (Hamburg, DE) — a publicly traded fashion platform — demonstrating strong written communication and positioning skills."),
            ("Process", "Research, categorization, prioritization, execution, and follow-up — applied systematically to a business development goal."),
        ]):
            ProjectHighlight.objects.create(project=p4, label=label, text=text, order=i)

        self.stdout.write(self.style.SUCCESS("Seed data loaded."))
