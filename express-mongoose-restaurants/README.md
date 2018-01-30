# Forest with Express - MongoDB Example

Your're in the good place if you have an application (in any language) that have a MongoDB database and you would like to have a Forest admin interface built on top.

- [Requirements](#requirements)
- [Installation](#installation)

![Screenshot](screenshot.png?raw=true "Screenshot")

## Requirements
- Git
- Nodejs & yarn
- MongoDB client
- Docker & Docker Compose

## Installation

#### 1. Create the MongoDB database

```
$ docker-compose up
```

#### 2. Install NPM packages

```
$ yarn
```

#### 3. Export the required environment variables
Open the file `.env` and set the following environment variables:

```
DATABASE_URL=mongodb://localhost/restaurants
FOREST_AUTH_SECRET=
FOREST_ENV_SECRET=
```

#### 4. Launch your app

```
$ node bin/www
```
