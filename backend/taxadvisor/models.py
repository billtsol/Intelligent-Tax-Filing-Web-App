from django.db import models

# Create your models here.
from django.db import models
import json

class TaxData(models.Model):
    data = models.JSONField()

    def __str__(self):
        return json.dumps(self.data, indent=4)