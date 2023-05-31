from django.db import models


# Create your models here.

class Mechanic(models.Model):
    name = models.CharField(max_length=200)
    experience = models.TextField(null=True, blank=True)
    price = models.TextField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    description = models.TextField(default=18)

    #  updated = models.DateTimeField(auto_now=True)
    # created=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name + ' experience: ' + self.experience + ' price :' + self.price + ' age: ' + str(self.age) + 'description: ' + self.description


class CarType(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    revenue = models.IntegerField(null=True, blank=True)
    year = models.TextField(null=True, blank=True)
    nationality = models.TextField(null=True, blank=True)

    #  updated = models.DateTimeField(auto_now=True)
    # created=models.DateTimeField(auto_now_add=True)
    # class Meta:
    #   ordering=['-updated','-created']

    def __str__(self):
        return self.name + ' revenue: ' + str(self.revenue) + ' nationality:  ' + self.nationality + ' year: ' + self.year + 'description: ' + self.description


class Car(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    mechanics = models.ManyToManyField(Mechanic, through='Repaired')
    year = models.IntegerField(null=True, blank=True)
    carType = models.ForeignKey(
        CarType,
        on_delete=models.CASCADE
    )

    #  updated = models.DateTimeField(auto_now=True)
    #  created=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name + ' ' + str(self.price) + ' ' + str(self.year) + ' ' + self.description


class Repaired(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    mechanic = models.ForeignKey(Mechanic, on_delete=models.CASCADE)
    date_created = models.CharField(max_length=12)
    price = models.IntegerField(default=0)

    def __str__(self):
        return str(self.id) + str(self.car) + ' ' + str(self.mechanic) + ' ' + self.date_created + ' ' + str(self.price)
