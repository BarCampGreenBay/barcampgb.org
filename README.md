BarCamp Green Bay App
=====================

[![Build Status](https://travis-ci.org/BarCampGreenBay/barcampgb.org.svg?branch=master)](https://travis-ci.org/BarCampGreenBay/barcampgb.org)

BarCamp Green Bay app code.

## Prerequisites

- Docker

## Development

1. clone and cd to this repo
2. run `docker-compose up` and open browser to [localhost:8000](http://localhost:8000)
3. run `docker exec barcampgborg_web_1 npm run seed` once to seed the db
4. run `docker exec barcampgborg_web_1 npm test` to execute the tests

## Seed data

After running the seed command, two users will exist:

- **email**: test@test.com; **password**: test; **admin**: true
- **email**: test2@test.com; **password**: test

An event and a couple proposals will also be created.
