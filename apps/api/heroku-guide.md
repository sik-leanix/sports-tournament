# How to deploy an express API with postgres database to heroku

## Deployment setup

### Deploying your node express app

1. Create a heroku account
2. Install heroku CLI ([link to docs](https://devcenter.heroku.com/articles/heroku-cli))

   ```bash
   brew tap heroku/brew && brew install heroku
   ```

3. Create a new heroku app using the CLI.

   ```bash
   heroku login
   heroku create -a <YOUR_APP_NAME> # you can also just run "heroku create" and the name will be auto-generated
   ```

   This will create a new heroku app in your account and also add a new `heroku` remote to your local repository. Test this using `git remote -v`.

4. Add a Procfile that builds your API and executes the entrypoint file.

   ```Procfile
   web: npm run api:build && node dist/apps/api/main.js

   ```

5. Make sure the node engine is configured in your `package.json`

   ```json
   "engines": {
   "node": "16.13.1"
   },
   ```

6. At this point you can test your heroku setup locally

   ```bash
   heroku local web -p 7001
   ```

7. If everything works as expected, trigger the first deployment using `git push heroku main`

### Provisioning a database

1. Inside the directory where you just created your heroku app, install the postgres heroku addon

   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

TODO: Document how to run migrations on provisioned database.
Something like `heroku run npm run api:knex migrate:latest`

## Deployment

If your setup is working fine locally, it's time to push:

```bash
git push heroku main
```

Whenever pushing to the heroku remote, that code is deployed.

## Resources

- https://devcenter.heroku.com/articles/getting-started-with-nodejs
- https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment
- https://devcenter.heroku.com/articles/git#create-a-heroku-remote
- https://devcenter.heroku.com/articles/deploying-nodejs
- https://devcenter.heroku.com/articles/node-best-practices
- https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
