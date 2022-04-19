from django.db import models
from users.models import User

# Create your models here.
class Service (models.Model):
    name = models.CharField(max_length=30)
    descrition = models.TextField(null=True, blank=True, max_length=255)
    cost = models.FloatField()

    def __str__(self):
        return self.name.capitalize()

    def get_name(self):
        return self.name.capitalize()

    def get_descrition(self):
         return self.descrition
    
    def get_cost(self):
        return self.cost
