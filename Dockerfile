FROM node:8-alpine
MAINTAINER <GROUP_NAME_HERE>

# Change working directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./
RUN npm install

# Copy App Source and Dependencies
COPY . .

#TODO Run any build scripts here

EXPOSE 80
EXPOSE 3000
CMD [ "npm", "start" ]
