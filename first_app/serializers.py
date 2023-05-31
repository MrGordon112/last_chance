from rest_framework import serializers
from .models import Car, CarType, Mechanic, Repaired


class RepiaredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repaired
        fields = ['id', 'car', 'mecanic', 'date_created', 'price']


class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'name', 'revenue', 'nationality', 'year', 'description']


class CarIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id']


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'price', 'year', 'carType', 'description']


class MechanicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechanic
        fields = ['id', 'name', 'experience', 'price', 'age', 'description']


class RepairedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repaired
        fields = ['id', 'car', 'mechanic', 'date_created', 'price']


# average age that mechanics that worked on a car have
class CarMechanicReportDTO:
    def __init__(self, mechanic_name, avg_age):
        self.mechanic_name = mechanic_name
        self.avg_age = avg_age


class CarMecanicReportDTOSerializer(serializers.Serializer):
    mechanic_name = serializers.CharField()
    avg_age = serializers.FloatField()
