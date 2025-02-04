# AI-Powered Tax Advisor

## Description
This project is a full-stack application designed to provide personalized tax advice using **OpenAI's GPT-3.5-turbo** model. It combines a modern **Next.js and React** frontend with a robust **Django REST framework** backend to deliver a seamless user experience. Users can input their tax-related data through a responsive and visually appealing form, and the system generates tailored recommendations on deductions, exemptions, and benefits. The integration of OpenAI's advanced language model ensures accurate and insightful advice, while the use of **Tailwind CSS** enhances the presentation of the results.

## Features
- **Frontend**: Responsive form built with Next.js and React.
- **Backend**: Django REST framework for handling data and API calls.
- **AI Integration**: OpenAI GPT-3.5-turbo for generating tax advice.
- **Styling**: Tailwind CSS for a clean and modern UI.

## How It Works
1. Users submit their tax-related data through the frontend form.
2. The backend validates the data and sends it to the OpenAI API.
3. OpenAI processes the data and returns personalized tax advice.
4. The advice is displayed to the user in a well-formatted HTML response.

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Django REST framework
- **AI Model**: OpenAI GPT-3.5-turbo

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/billtsol/Intelligent-Tax-Filing-Web-App.git
   ```

2. Set Up the Backend: 

    Follow the instructions in the backend README to set up the Django REST framework backend.

3. Set Up the Frontend: 
    
    Follow the instructions in the frontend README to set up the Next.js and React frontend.

4. Build Container:
    ```bash
    docker-compose up --build
    ```

# CI Process Explanation

This GitHub Actions workflow automates the build, test, and deploy process for a Dockerized Next.js and Django project.

## Trigger
- The workflow is triggered on a `push` to the `master` branch.

## Job: `build_and_test`
- **Runs on**: `ubuntu-latest`
- **Steps**:

### 1. Login to Docker Hub
- Logs in to Docker Hub using credentials stored in GitHub secrets.

### 2. Checkout Repository
- Retrieves the latest code from the repository using `actions/checkout`.

### 3. Set up Docker Buildx
- Configures Docker Buildx for multi-platform builds using `docker/setup-buildx-action`.

### 4. Build Frontend Docker Image (Next.js)
- Builds the Docker image for the Next.js frontend with the tag `my-next-app` using the `./frontend` directory.

### 5. Build Backend Docker Image (Django)
- Builds the Docker image for the Django backend with the tag `my-django-app:latest` using the `./backend` directory.

### 6. Run Django Tests
- Runs Django tests inside the Docker container using the command `docker run --rm my-django-app:latest python manage.py test`.

## Summary
- The workflow builds Docker images for both frontend (Next.js) and backend (Django).
- It runs backend tests to ensure functionality.
- Triggered on a push to the `master` branch for continuous integration.
