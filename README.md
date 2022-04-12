# Sports Tournament

## Setup

1. Clone this repository
2. Execute `npm install`
3. Install [Docker for Mac](https://docs.docker.com/desktop/mac/install/) (needed for local postgres database)

## Local development

To start the bookmarks node backend including a postgres database in docker, run:

```bash
npx nx run api:serve
```

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.
