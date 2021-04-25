# pull base image
FROM node:15-alpine

# add git
RUN apk --no-cache add git

# pull repo
RUN git clone https://github.com/manoj-gupta/glance-ui.git

# set working directory
WORKDIR glance-ui

# install app dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start app
CMD ["npm","start"]