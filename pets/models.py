from django.db import models
from users.models import User
from host.models import Host

# Create your models here.
class Pet (models.Model):
    name = models.CharField(max_length=30)
    host = models.ForeignKey(Host, related_name='pets', on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    breed = models.CharField(max_length=30)
    colour = models.CharField(max_length=30)
    age = models.SmallIntegerField()
    weight = models.FloatField()
    medical_conditions = models.TextField(null=True, blank=True, max_length=255)
    temperament = models.CharField(max_length=255)
    is_hosted = models.BooleanField(default=True)
    owner = models.ForeignKey(User, related_name='pets', on_delete=models.CASCADE)


    def __str__(self):
        return str(self.id) + " - " + self.name

    def get_name(self):
        return self.name.capitalize()

    def get_owner(self):
         return self.owner
    
    def get_host_status(self):
        if self.is_hosted:
            return 'Hospedado'
        return 'Não hospedado'
