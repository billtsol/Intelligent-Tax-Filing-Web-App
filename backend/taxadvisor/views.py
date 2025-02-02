from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TaxData
from .serializers import TaxDataSerializer
from openai import OpenAI

client = OpenAI(api_key="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")

@api_view(['POST'])
def save_tax_data(request):
    serializer = TaxDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_ai_advice(request):
    data = request.data
    user_name = data.get('name', '')
    income_items = data.get('incomeItems', [])
    expense_items = data.get('expenseItems', [])
    tax_liability = data.get('taxLiability', 0)

    # Construct the message for OpenAI
    message = f"Ονομα: {user_name}\n\n Εισοδήματα:\n"
    for item in income_items:
        message += f"- {item['category']}: {item['amount']}€\n"
    message += "\n Έξοδα:\n"
    for item in expense_items:
        message += f"- {item['category']}: {item['amount']}€\n"
    message += f"\n Φορολογική Ευθύνη: {tax_liability}€\n\n"
    message += "Παρακαλώ δώσε μια προσωποποιημένη εξήγηση για τα δεδομένα μου, συμβουλές για τη φορολογική μου ευθύνη και πώς μπορώ να βελτιώσω την οικονομική μου κατάσταση."

    
    response = client.chat.completions.create(model="gpt-3.5-turbo", messages=[
        {"role": "user", "content": message}
    ])
    
    return Response({'advice': response.choices[0].message.content})