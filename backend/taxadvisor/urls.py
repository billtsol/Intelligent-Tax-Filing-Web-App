from django.urls import path
from . import views

urlpatterns = [
    path('save-tax-data/', views.save_tax_data, name='save_tax_data'),
    path('get-ai-advice/', views.get_ai_advice, name='get_ai_advice'),
]