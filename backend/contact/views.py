import logging
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        try:
            send_mail(
                subject=f"Portfolio contact: {instance.name}",
                message=f"From: {instance.name} <{instance.email}>\nCompany: {instance.company}\n\n{instance.message}",
                from_email=None,
                recipient_list=[settings.CONTACT_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            logger.exception("Failed to send contact notification email")
