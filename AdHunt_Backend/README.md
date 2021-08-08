# AdHunt/backend

## Prerequisites

Both for the backend and frontend application:
* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://nodejs.org/en/)  (node package manager)
Just for the backend application:
* mongodb [official installation guide](https://docs.mongodb.com/manual/administration/install-community/)
* stripe CLI [official installation guide](https://stripe.com/docs/stripe-cli)

## Setup (before first run)

* Go to your project root folder via command line
```
cd path/to/workspace/backend
```

* Install node dependencies
```
npm install
```

## Set up your database

* Create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
* Start the database server
```
mongod --dbpath "path/to/database"
```

* Import all the relevant data from [frontend/src/data](https://gitlab.lrz.de/seba-master-2021/team-30/frontend/-/tree/master/src/data) into your database

## Set up Stripe

* Create a new Stripe account[here](https://dashboard.stripe.com/register)
* Copy your secret test mode API key in the stripeKey variable in [src/config.js](https://gitlab.lrz.de/seba-master-2021/team-30/backend/-/blob/master/src/config.js).
* Run your webhook listner
```
stripe listen --forward-to localhost:4000/webhook
```
* Copy the printed webhook signing secret in the endPointSecret variable in [src/config.js](https://gitlab.lrz.de/seba-master-2021/team-30/backend/-/blob/master/src/config.js).


## Start the project

* Run the Application
```
npm start
```
