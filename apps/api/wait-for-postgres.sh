#!/bin/sh
# wait-for-postgres.sh

set -e

until PGPASSWORD="secret" psql -h "localhost" -p 5433 -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - moving on..."
