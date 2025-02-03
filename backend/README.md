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

### Additional Commands

- **Running tests:**

  ```bash
  python manage.py test
  ```

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
