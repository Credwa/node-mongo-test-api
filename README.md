FullStack Todo Application using VueJS, ExpessJS, NodeJS, MongoDB and Mocha for testing.

# Node-mongo-api

FullStack Todo Application using VueJS, ExpessJS, NodeJS, MongoDB and Mocha for testing.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
nodejs https://nodejs.org/en/
git https://git-scm.com/downloads
```

### Installing

A step by step series of examples that tell you have to get a development env running

Open terminal

Clone repository

```
git clone https://[insert username]:[insert password]@github.com/Credwa/node-mongo-test-api.git
```

cd into repo

```
cd arbitrage
```

Install project dependencies

```
npm install
```

Create config json file for environment variables

```
cd config/

touch config.json (for mac)
echo "" > config.json (for window)
```

```json
{
  "development": {
    "JWT_SECRET": "",
    "MONGODB_URI": "",
  }
}
```

Free 500mb database at https://mlab.com/

Start server

```
node server/server.js
```

## Running the tests

Nothing here for now

### Break down into end to end tests

Nothing here for now

### And coding style tests

Nothing here for now

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Express](https://expressjs.com/)

## Contributing

Nothing here for now.

## Versioning

Nothing here for now.

## Authors

* **Craig Edwards** - *Initial work* - [Credwa](https://github.com/credwa)

See also the list of [contributors](https://github.com/credwa/node-mongo-test-api/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments