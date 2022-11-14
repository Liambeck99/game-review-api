# Northcoders House of Games API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Running Project

To run the project you will first need to create 2 files in the top level of the repository. These 2 files will set the the environment variables on your local machine which will allow you to connect to that databases. These 2 files will be called _.env.development_ and _.env.test_

### .env.development

```
PGDATABASE=nc_games
```

### .env.test

```
PGDATABASE=nc_games_test
```
