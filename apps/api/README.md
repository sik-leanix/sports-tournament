# Sport tournament backend

## Local development server

Execute `npm start` to start a local server at [http://localhost:3001](http://localhost:3001).

### Migrations

Get the latest tables in your database by running the following command:

```
npm run knex:migrate
```

### Test fixtures

Get some test data in your database by running the following command:

```
npm run knex:seed
```

You can modify/extend the test data in `src/db/seeds`.

### Reset the database

In the early development phase we'll be changing table configurations regularly. To not have to deal with backwards compatible migrations, there's a command to easily remove all tables and recreate them using the latest migrations:

```
npm run reset-db
```
## Setting up local database

[The local database setup is based on this article](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/).

### Installing postgres

If you do not have `brew` installed run the following command:

```
/bin/bash -c “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)”
```

If you do not have postgres installed locally run the following commands:

```
brew update
brew install postgresql
```

If you do not want to use `brew` you can also use the [offical installer](https://www.postgresql.org/download/).

#### Starting local postgres

Run the following command to start your local postgres service:

```
brew services start postgresql
```

To check if your local postgres is currently running execute `brew list`.

### Configuring database

Next you need to setup a new user and a development database.

At [src/db/database-config.ts#LOCAL_CONFIG](./src/db/database-config.ts) you can see the local database config that needs to be configured.

You can enter the postgresql CLI using `psql postgres`.

#### 1. Create a new user

Execute these commands one by one:

```
psql postgres
CREATE ROLE sports_app WITH LOGIN PASSWORD 'secret';
ALTER ROLE sports_app CREATEDB;
\q
```

#### 2. Create a new database

[See docs](https://www.tutorialspoint.com/postgresql/postgresql_create_database.htm)

Execute these commands one by one:

```
psql postgres -U sports_app
CREATE DATABASE sports_tournament_dev;
\q
```

Now you should execute `npm run knex:migrate` to create the tables our app needs in your new database.

