#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

retries=20
if [ "$db_ssl" = "true" ]; then
  until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" -p $db_port --set=sslmode=require -c '\q' "$POSTGRES_DB" > /dev/null 2>&1 || [ $retries -eq 0 ]; do
    retries=$((retries-1))
    >&2 echo "Postgres is unavailable - sleeping, $retries remaining attempts..."
    sleep 1
  done
else
  until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" -p $db_port -c '\q' "$POSTGRES_DB" > /dev/null 2>&1 || [ $retries -eq 0 ]; do
    retries=$((retries-1))
    >&2 echo "Postgres is unavailable - sleeping, $retries remaining attempts..."
    sleep 1
  done
fi

# exit to throw an error and prevent other stuff from running
if [ $retries -eq 0 ]; then
  >&2 echo "Postgres is unavailable, exceeded max retries"
  exit 1
fi

>&2 echo "Postgres is up"
