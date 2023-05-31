from django.db.models import Avg
from django.http import JsonResponse
from .models import Car, CarType
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import datetime

today = datetime.date.today()

year = today.year


# VALIDATORS #
def validate_age(value):
    if value < 10 or value > 110:
        raise Exception("age must be between 10 and 110")
    return value


def validate_price(value):
    if int(value) < 10:
        raise Exception("price should be positive")
    return value


def validate_year(value):
    if value > year:
        raise Exception("the repair date cannot be after today")
        return False
    return True


# VALIDATORS #

@api_view(['GET', 'POST'])
def car_list(request, format=None):
    if request.method == 'GET':
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_year(request.data['year']):
            return
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def car_id_list(request, format=None):
    if request.method == 'GET':
        car = Car.objects.all().only('pk')
        serializer = CarIdSerializer(car, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def car_detail(request, id, format=None):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarSerializer(car)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not validate_year(request.data['year']):
            return
        serializer = CarSerializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def carType_list(request, format=None):
    if request.method == 'GET':
        categories = CarType.objects.all()
        serializer = CarTypeSerializer(categories, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = CarTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def carType_detail(request, id, format=None):
    try:
        carType = CarType.objects.get(pk=id)
    except  CarType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarTypeSerializer(carType)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CarTypeSerializer(carType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        carType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def carType_filter_revenue(request, revenue, format=None):
    try:
        carType = CarType.objects.filter(revenue__gt=revenue)
    except CarType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarTypeSerializer(carType, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def mechanic_list(request, format=None):
    if request.method == 'GET':
        mechanics = Mechanic.objects.all()
        serializer = MechanicSerializer(mechanics, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_age(request.data['age']):
            return
        validate_age(request.data['age'])

        serializer = MechanicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def mechanic_detail(request, id, format=None):
    try:
        mechanic = Mechanic.objects.get(pk=id)
    except Mechanic.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MechanicSerializer(mechanic)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not validate_age(request.data['age']):
            return
        serializer = MechanicSerializer(mechanic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mechanic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TAG END

# TAGGED START
@api_view(['GET', 'POST'])
def repaired_list(request, format=None):
    if request.method == 'GET':
        repaired = Repaired.objects.all()
        serializer = RepairedSerializer(repaired, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_price(request.data['date']):
            return
        serializer = RepairedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def repaired_detail(request, id, format=None):
    try:
        repaired = Repaired.objects.get(pk=id)
    except Repaired.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RepairedSerializer(repaired)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not validate_price(request.data['price']):
            return
        serializer = RepairedSerializer(repaired, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        repaired.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TAGGED END


def car_average_age(request):
    cars = Car.objects.annotate(average_age=Avg('mechanics__age')).order_by('-average_age')
    data = []
    for car in cars:
        data.append({
            'name': car.name,
            'carType': car.carType.name,
            'average_age': car.average_age,
        })
    return JsonResponse(data, safe=False)
# STATISTICS END
