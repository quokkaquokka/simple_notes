# Simple notes

This is a simple project to see the different tests (units, integrations,end-to-end) and set up a CI on gitlab.

## About

The user wants to be able to enter notes and put categories to sort them. There are no authentification because is juste an example

## Prerequisites

Use node 16.

Use [MongoDb Atlas](https://www.mongodb.com/products/platform/atlas-database) and in this database create collections : users, categories, notes.

Replace in code YOUR DATABSE by the link with the following format : `mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority`

Do not use port 8080 for anything else, or change this in the code.

## start projects

In `api` directory, in terminal install node_modules (`npm i`)

To start server : `npm run start` If your server is corrrectly start you have a message :`Server running on http://localhost:8080`

And to test route, you can test in [postman](https://www.postman.com/)

## start tests

To start test all test: `npm run test`

To start units test : `npm run test:unit`

To start integration test : `npm run test:integration`

To start end to end test : `npm run test:e2e`
