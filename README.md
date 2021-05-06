# Glance UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation

## Getting Started

- You need to have Node and NPM installed on your computer.
- Installing Node automatically comes with npm.

## Clone

Clone this project to your local machine https://github.com/manoj-gupta/glance-ui.git

## Setup (without Docker)

- Installing the project dependencies

```
$ npm install
```

- Start the project

```
$ npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Docker mode

- Build docker image using

```
docker build -t glance-ui .
```

- Run docker image using

```
docker run -it -p 3000:3000 --name glance-ui glance-ui
```
