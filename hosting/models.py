from django.db import models
from pets.models import Pet
from services.models import Service
from users.models import User

# Create your models here.

class Hosting (models.Model):
    owner = models.ForeignKey(
        User,
        related_name='owner',
        on_delete=models.CASCADE,
    )
    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
    )
    employee = models.ForeignKey(
        User,
        related_name='employee',
        on_delete=models.CASCADE,
        null=True
    )
    services = models.ManyToManyField(Service, blank=True)
    
    start_date = models.DateField()
    end_date = models.DateField()
    observations = models.CharField(max_length=255)
    cost = models.FloatField()
    approved = models.BooleanField(default=False)

    def __str__(self):
        return str(self.owner) + " - " + str(self.pet) + " - " + str(self.start_date)

    def get_duration(self):
        return self.end_date - self.start_date
