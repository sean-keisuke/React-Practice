## Quick Start using Docker

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
