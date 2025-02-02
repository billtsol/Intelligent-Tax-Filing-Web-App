SOS
local build: docker build -t my-django-app:latest ./backend
run: docker run --rm my-django-app python manage.py test