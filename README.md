# dronut-starter

[![Build Status](https://travis-ci.com/CMU-17-356/dronuts-2019-group-5.svg?branch=master)](https://travis-ci.com/CMU-17-356/dronuts-2019-group-5)
[![Greenkeeper badge](https://badges.greenkeeper.io/CMU-17-356/dronuts-2019-group-5.svg)](https://greenkeeper.io/)

## Links
Site: http://40.78.84.106:3000/

Issue Tracking: https://trello.com/b/0sPIIyJv/17-356-product-backlog

## Useful commands
```shell
# Local development
npm run init-db  # Run once to initialize the SQLite database
npm run server  # Run just the API server
npm run client  # Run just the React frontend
npm start  # Run both the server and client together
npm test  # Run tests

# Local development with Docker Compose
docker-compose up
```

## Deployment
This repo uses [Travis CI](https://travis-ci.com/CMU-17-356/dronuts-2019-group-5) for automated deployments. 
If a change is merged to master, the build automatically kicks off. 
On successful builds, the site is deployed to Azure on http://40.78.84.106:3000/.

## Tools used
- Create-React-App (Typescript)
- Linting: ESLint (via Create-React-App)
- Testing: Jest and Enzyme
- Dependency Management: Greenkeeper
- CI: Travis CI
- Google Analytics (group5dronuts@gmail.com)
- Database: SQLite

## References
- Microsoft's [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
- LemonCode [react-typescript-samples (03 Navigation)](https://github.com/Lemoncode/react-typescript-samples/tree/master/03%20Navigation)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
