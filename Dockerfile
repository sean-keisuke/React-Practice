FROM python:3.7.7-slim-buster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# RUN for i in {1..8}; do mkdir -p "/usr/share/man/man$i"; done
RUN apt-get -qq update \
    && mkdir -p /usr/share/man/man1 /usr/share/man/man7 \
    && apt-get -y install binutils libproj-dev gdal-bin postgresql-client net-tools
WORKDIR /app
COPY requirements.txt /app    
RUN pip install -r requirements.txt
COPY wait-for-postgres.sh /opt
COPY . /app
RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]
