# Pedals API

The Pedals API. All the data you need setup your very own unoptimised cycle route planning server/database.

## Getting Started

**Clone this repository**

In your terminal type the following commands:

```bash
git clone https://github.com/Caitlin-B/be-project-pedals

```

## Prerequisites

**You will need some form of packet manager to install the necessary tools to use the API, in this README we will be using node packet manager (npm)**

If you don't have npm see this link on how to install it: https://www.npmjs.com/get-npm

**You will need Node version v13.0.1 or later to use this API**

**You will also need MongoDB v4.2.3 or later to run the database**

Follow this link to install MongoDB https://docs.mongodb.com/guides/server/install/

## Installing

**Check you're in the be-project-pedals directory before running the following commands**

if not cd into it:

```bash
cd be-project-pedals
```

Run the following command:

```bash
npm install
```

**You will also need to create your own .env file with all your passwords in it to run the project**

```
// in .env

JWT_SECRET='YOUR_JWT_SECRET_PASSWORD'
```

## Run locally

You should now be ready to run this project locally. To do so, first you need to seed the development database. Run the following command:

```bash
md-seed run --dropdb
```

Then to run locally, run:

```bash
npm start
```

Then in your browser go to http://localhost:9090/api/ to access your API.

try going to /routes, /reviews and /users. These are the endpoints of this API.

## Running the tests

To test the app run the following command:

```bash
npm test
```

This script will also seed the test database.

## Hosting, optional!

Should you wish to host your API we used mongoDB atlas to host the production database and heroku to host the API. Once you've set up your mongoDB atlas account and hosted the database by following the atlas docs: https://docs.atlas.mongodb.com/.

Set the MONGODB_URI in the .env file you created earlier to the given value on atlas. Your .env file will now look like this:

```
// in .env

MONGODB_URI='YOUR_HOSTED_DB_URL' // Only if you have created a hosted version. Not needed for local hosting

JWT_SECRET='YOUR_JWT_SECRET_PASSWORD'
```

Then host the API on heroku following the heroku docs... https://devcenter.heroku.com/articles/getting-started-with-nodejs and once you have done that, you can go to the given URL to access your database globally.

To seed data into the production database, run the following command:

```bash
npm run seed-prod
```

**Here is a link to our hosted version: http://project-pedals.herokuapp.com/api/ which you can use instead of hosting your own.**

## Links to APP/API

**Frontend APP github repo: https://github.com/nickbadlose/fe-project-pedals .**

**Hosted backend API: http://project-pedals.herokuapp.com/api/ .**

**Deployed APP: https://pedals.netlify.com/ .**

## Acknowledgments

Contributors: https://github.com/Caitlin-B, https://github.com/nickbadlose, https://github.com/akl28, https://github.com/sfmoulton, https://github.com/Neil10july

Thanks: Northcoders Manchester
