from django.db import models
from hosting.models import Hosting

class Payment(models.Model):
    hosting = models.ForeignKey(
        Hosting,
        on_delete=models.CASCADE,
    )
    namePayment = models.CharField(max_length=100)

    def __str__(self):
        return  str(self.namePayment)
