from django.db import models

# Create your models here.
class Pet (models.Model):
    name = models.CharField(max_length=30)
    species = models.CharField(max_length=30)
    breed = models.CharField(max_length=30)
    colour = models.CharField(max_length=10)
    size =  models.CharField(max_length=10)
    age = models.SmallIntegerField()
    weight = models.FloatField()
    medical_conditions = models.TextField(max_length=255)
    personality = models.CharField(max_length=255)
    is_hosted = models.BooleanField(default=True)
    since = models.DateField(blank=True, null=True)
    owner = models.CharField(max_length=30)

    def get_name(self):
        return self.name.capitalize()

    def get_owner(self):
         return self.owner
    
    def get_host_status(self):
        return self.owner.capitalize()
