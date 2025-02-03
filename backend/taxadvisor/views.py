from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TaxData
from .serializers import TaxDataSerializer
from openai import OpenAI

# Best practice is to store the API key in an environment variable. import os os.getenv("OPENAI_API_KEY")
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

    # List of required fields
    required_fields = ['fullName','age', 'maritalStatus','income', 'expenses', 'taxClass']

    # Check for missing fields
    missing_fields = [field for field in required_fields if field not in data or data[field] == '']

    if missing_fields:
        return Response(
            {'error': f'Missing required fields: {", ".join(missing_fields)}'},
            status=status.HTTP_400_BAD_REQUEST
        )

    full_name = data.get('fullName', '')
    income = data.get('income', 0)
    additional_income = data.get('additionalIncome', 0)
    deductions = data.get('deductions', 0)
    expenses = data.get('expenses', 0)
    tax_class = data.get('taxClass', '')
    marital_status = data.get('maritalStatus', '')
    age = data.get('age', 0)

    # Create message
    message = f"Ονομα: {full_name}\n\n"
    message += f"Ηλικία: {age}\n"
    message += f"Κατάσταση Οικογενειακή: {marital_status}\n"
    message += f"Φορολογική Κατηγορία: {tax_class}\n"
    message += f"\n Εισόδημα: {income}€\n"
    message += f"Επιπλέον Εισόδημα: {additional_income}€\n"
    message += f"Εκπτώσεις: {deductions}€\n"
    message += f"Έξοδα: {expenses}€\n"
    
    # Check if additional income and deductions are not empty
    additional_income_float = float(additional_income) if additional_income else 0.0
    deductions_float = float(deductions) if deductions else 0.0

    result = additional_income_float - deductions_float

    # Calculate tax liability
    tax_liability = float(income) + result - float(expenses)
    message += f"\n Φορολογική Ευθύνη: {tax_liability}€\n\n"

    message += "Κάνω φορολογική δήλωση στην Ελλάδα. Θα ήθελα να προτείνεις πιθανές εκπτώσεις φόρου. \
        Με βάση την φορολογική μου κατηγορία ή την ηλικία ή/και την οικογενειακή κατάσταση, θέλω να αναλύσεις και να μου προτεινεις απαλαγές φορών και έξτρα επιδόματα. \
            Βάλε μέσα σε ένα <div> και μορφοποίησε την απάντηση σου με την καλύτερη δυνατή μορφή, βάλε  <h1>, <h2>, <ul>, <li> <br> και tailwindCss. (απάντα σε 2ο πρόσωπο)"

    # Call OpenAI API
    try: 
        response = client.chat.completions.create(
            model="gpt-3.5-turbo", 
            messages=[
                {"role": "user", "content": message}
            ],
            n=1
        )

    except Exception as e:
        print(e)
        return Response({'error': 'An error occurred while processing your request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'advice': response.choices[0].message.content})