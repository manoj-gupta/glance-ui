# Glance UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation

## Getting Started

- You need to have Node and NPM installed on your computer.
- Installing Node automatically comes with npm.

## Clone

Clone this project to your local machine https://github.com/manoj-gupta/glance-ui.git

## Development Environment

### Setup (without Docker)

- Installing the project dependencies

```
$ npm install
```

- Start the project

```
$ npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Docker mode

- Build docker image using

```
docker build -f Dockerfile.dev -t glance-ui .
```

- Run docker image using

```
docker run --env-file ./.env -v $PWD/src:/glance-ui/src:ro --rm -d -p 3000:3000 --name glance-ui glance-ui
```

- Container shell

```
docker exec -it glance-ui /bin/sh
```

- Kill container

```
docker rm glance-ui -f
```

### Using docker-compose

#### Start

```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
```

#### Stop

```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml down
```

## Production environment

### Docker mode

- Build docker image using

```
docker build -f Dockerfile.prod -t glance-ui-prod .
```

- Run docker image using

```
docker run --env-file ./.env --rm -d -p 8000:80 --name glance-ui-prod glance-ui-prod
```

### using docker compose

#### start

```
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```

#### stop

```
docker-compose -f docker-compose.yml -f docker-compose-prod.yml down
```
