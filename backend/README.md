# Intelligent Tax Filing Web App - Backend

This is the backend for the Intelligent Tax Filing Web App, built using Django Rest Framework and Python's virtual environment (venv).

## Setup Instructions

### Prerequisites

- Python 3.x
- pip (Python package installer)
- virtualenv

### Installation

1. **Create a virtual environment:**

    ```bash
    python -m venv venv
    ```

2. **Activate the virtual environment:**

    - On Windows:

      ```bash
      venv\Scripts\activate
      ```

    - On macOS/Linux:

      ```bash
      source venv/bin/activate
      ```

3. **Install the required packages:**

    ```bash
    pip install -r requirements.txt
    ```

### Running the Application

1. **Apply the migrations:**

    ```bash
    python manage.py migrate
    ```

2. **Create a superuser (optional, for accessing the admin interface):**

    ```bash
    python manage.py createsuperuser
    ```

3. **Run the development server:**

    ```bash
    python manage.py runserver
    ```

The application will be available at `http://127.0.0.1:8000/`.

## Endpoint

**URL:** `http://127.0.0.1:8000/api/get-ai-advice`

**Method:** `POST`

## Request Body
The API expects a JSON payload with the following structure:

```json
{
    "fullName": "John Doe",
    "income": "50000",
    "additionalIncome": "5000",
    "deductions": "2000",
    "expenses": "10000",
    "taxClass": "Οικογενειακός φορολογούμενος",
    "maritalStatus": "Single",
    "age": "30"
}
```

### Field Descriptions:
- **fullName** *(string)*: The user's full name.
- **income** *(string)*: The primary income of the user.
- **additionalIncome** *(string)*: Any additional income sources.
- **deductions** *(string)*: Tax-deductible expenses.
- **expenses** *(string)*: Monthly or yearly expenses.
- **taxClass** *(string)*: Tax classification (e.g., "Οικογενειακός φορολογούμενος").
- **maritalStatus** *(string)*: The marital status of the user.
- **age** *(string)*: The user's age.

## Response
The API returns a JSON object with AI-generated financial advice. Example response:

```json
{
    "advice": "Based on your income and expenses, consider increasing your savings rate to improve financial stability. Investing in diversified assets may also be beneficial."
}
```

## Usage Example
### cURL Command
```sh
curl -X POST "http://127.0.0.1:8000/api/get-ai-advice" \
     -H "Content-Type: application/json" \
     -d '{
           "fullName": "John Doe",
           "income": "50000",
           "additionalIncome": "5000",
           "deductions": "2000",
           "expenses": "10000",
           "taxClass": "Οικογενειακός φορολογούμενος",
           "maritalStatus": "Single",
           "age": "30"
         }'
```

## Error Handling
If there is an issue with the request, the API will return an error message. Example:

```json
{
    "error": "Invalid input data. Please check the fields and try again."
}
```

## Additional Commands

- **Running tests:**

  ```bash
  python manage.py test
  ```

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
