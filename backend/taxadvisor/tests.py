from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from django.urls import reverse

from rest_framework.response import Response

ADVISOR_URLS = reverse('get_ai_advice')

class GetAIAdviceViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('taxadvisor.views.client.chat.completions.create')
    def test_get_ai_advice_success(self, mock_openai):
        # Mock the OpenAI API response
        mock_openai.return_value.choices[0].message.content = "<div><h1>Tax Advice</h1><p>Some advice here.</p></div>"

        # Sample request data
        data = {
            'fullName': 'John Doe',
            'income': 50000,
            'additionalIncome': 5000,
            'deductions': 2000,
            'expenses': 10000,
            'taxClass': 'Οικογενειακός φορολογούμενος',
            'maritalStatus': 'Single',
            'age': 30
        }

        # Make the POST request
        response = self.client.post(ADVISOR_URLS, data, format='json')

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response data
        self.assertIn('advice', response.data)
        self.assertEqual(response.data['advice'], "<div><h1>Tax Advice</h1><p>Some advice here.</p></div>")
        
    def test_get_ai_advice_missing_fields(self):
        # Sample request data with missing fields
        data = {
            'fullName': 'John Doe',
            'income': 50000,
            # Missing other fields
        }

        # Make the POST request
        response = self.client.post(ADVISOR_URLS, data, format='json')

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('taxadvisor.views.client.chat.completions.create')
    def test_get_ai_advice_openai_error(self, mock_openai):
        # Mock the OpenAI API to raise an exception
        mock_openai.side_effect = Exception("OpenAI API error")

        # Sample request data
        data = {
            'fullName': 'John Doe',
            'age': 30,
            'maritalStatus': 'Single',
            'income': 50000,
            'expenses': 10000,
            'taxClass': 'Οικογενειακός φορολογούμενος',
        }

        # Make the POST request
        response = self.client.post(ADVISOR_URLS, data, format='json')

        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Check the response data
        self.assertIn('error', response.data)