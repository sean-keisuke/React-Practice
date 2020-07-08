#!/bin/sh
sh /opt/wait-for-postgres.sh db
python manage.py migrate
python manage.py runserver 0.0.0.0:8000