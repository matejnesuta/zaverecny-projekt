#!/bin/sh
cd backend
python3 manage.py makemigrations
python3 manage.py migrate
cd ..
exec "$@"