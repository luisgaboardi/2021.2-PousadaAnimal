from django.db import models

from users.models import User
from hosting.models import Hosting

class Message (models.Model):
    user = models.ForeignKey(
        User,
        related_name='user',
        on_delete=models.CASCADE,
    )
    hosting = models.ForeignKey(
        Hosting,
        related_name='messages',
        on_delete=models.CASCADE,
    )
    time_sent = models.DateTimeField()
    content = models.CharField(max_length=255)

    def __str__(self):
        return "(" + str(self.time_sent) + ") " + str(self.user.first_name) + ": " + str(self.content)