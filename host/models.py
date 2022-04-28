from django.db import models

class Host (models.Model):
    species = models.CharField(max_length=30)
    size = models.CharField(max_length=30)
    cost = models.FloatField()

    def __str__(self):
        return self.species.capitalize() + " - " + self.size

    def get_species(self):
        return self.species.capitalize()

    def get_size(self):
         return self.size
    
    def get_cost(self):
        return self.cost