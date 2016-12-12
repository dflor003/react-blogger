React Blogger
====

Blogging Demo App using ReactJS

# Instructions

Run the backend with docker compose:

```bash
$ docker-compose up -d
```

Run the frontend with the following commands:

```
	npm install && npm run start:app
```

Navigate to: http://localhost:3000

# One time db setup

Upon starting the app you will have to hit the backend server running on port `3001` to initialized the database schema. Depending on whether you are running docker using `docker-machine` or not, your URL will be one of the following:

* **Docker Machine** - `192.168.99.100` or may have been reassigned, use `docker-machine ip default` to get the correct ip.
* **Latest Docker** - `localhost`. However, make sure you have ports `3000` and `3001` free.

Either hit the endpoint manually via a `POST` to `http://localhost:3001/api/sync` (no body) or run the following curl command.

`curl -isb -H "Content-Type: application/json" -X POST http://dockerhost:3001/api/sync`

You should receive a `204 No Content` response if everything went well.
