# Glance UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running glance-ui

### Development mode
Install following packages:
* `npm install axios`
* `npm install semantic-ui-react`

In the project directory, run:
* `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Docker mode

Build docker image using
* `docker build -t glance-ui .`

Run docker image using
* `docker run -it -p 3000:3000 --name glance-ui glance-ui`
