from rest_framework import serializers
from .models import TaxData

class TaxDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxData
        fields = '__all__'