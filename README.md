## Quick Start using Docker

### Create a .env file

We include this in the repo as an example file at `.env.example`

```
POSTGRES_USER=DBUSER
POSTGRES_PASSWORD=DBPASS
POSTGRES_DB=APPDB
POSTGRES_PORT=5432
CHOKIDAR_USEPOLLING=true
SECRET_KEY=something
DEBUG=true
```

`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` are used the very first time you fire up the database to create an initial user and database.  After that they cannot be changed.

`CHOKIDAR_USEPOLLING=true` if you are on Windows, otherwise just leave that out for Mac/Linux as it will cause lots of CPU usage.

`SECRET_KEY` make whatever you want, it's used by Django.

`DEBUG` is the Django debug flag and should be set to `true` in development.

### Run docker compose to fire up the services

First time run:

`docker-compose build`

then you can run:

`docker-compose up`

which fires up the dev server on [http://localhost:3000](http://localhost:3000)

and when you are done you can `Ctrl-C` and optionally run `docker-compose down` which will completely delete the running containers.

to get inside the container, which you might do if you want to install a new package, just run:

`docker-compose exec react bash`

this is similar to SSH'ing to a remote server. It drops you to a bash prompt inside the container.

Let's say you are doing that to install a new npm package, there's a couple extra steps. Remember you normally would need to install a new package, then stop and start your server to get it.

So to install a new package, you would:

```bash
docker-compose exec react bash
npm install my-cool-package
exit
```

Now you need to stop the server and rebuild it so the node_modules are built in the container:

`Ctrl-C` (in your terminal that you did the docker-compose up)

or

`docker-compose down`

Then:

`docker-compose build`

which will build node_modules in your container.

then:

`docker-compose up`
