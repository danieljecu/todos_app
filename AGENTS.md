## Cursor Cloud specific instructions

Local development uses Postgres on the VM, the Express API in `api/`, and the CRA UI in `ui/`. Docker is not required. `docker-compose.yml` is the older full-stack path and is not what this environment starts.

The default image's Node is 22.x. `api/package.json` declares `engines.node` `20.x`, so `npm ci` prints `EBADENGINE`. The API still installs, `tsc` builds, unit tests pass, and `npm run serve` listens on port 3000. Do not switch Node versions for that warning.

### Install

Postgres 16 comes from apt (`postgresql` and `postgresql-contrib`). Package install does not start the server here (`policy-rc.d` blocks it); start it in the boot script below.

```bash
if ! command -v psql >/dev/null 2>&1; then
  sudo apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql postgresql-contrib
fi
if [ ! -f api/.env ]; then
  cp api/.env.example api/.env
fi
( cd api && npm ci --legacy-peer-deps )
( cd ui && npm ci --legacy-peer-deps )
```

`--legacy-peer-deps` is required on `main`: `@reach/dialog@0.18.0` does not accept React 19, so plain `npm ci` in `ui/` fails with `ERESOLVE`. This branch removes that package; the same flag still installs cleanly. `api` postinstall runs `prisma generate` and reads `DATABASE_URL` from `api/.env`. Copy `.env.example` before `npm ci`. No other secrets are required for local dev. Outside production, missing `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` fall back to a dev placeholder.

`npm ci` was run twice in a row and completed both times.

### Database and processes

```bash
sudo pg_ctlcluster 16 main start
```

Create role `"user"` with password `password` and database `todo` if they are missing (`api/.env.example` connection string). Apply only:

- `Migrations/schema/V1.0__initial_schema_setup.sql`
- `Migrations/schema/V1.1__adding_resources.sql`

Skip `Migrations/seed/V1.1000__seed_database.sql`. On an empty database it inserts some rows and then fails: `syntax error at or near "4"` at the truncated final `INSERT`.

API and UI both want port 3000. Run the API on 3000 and the UI on 3001.

- API dev server: `cd api && npm run serve` (`tsc --watch` plus nodemon). `GET /health` returns `ok`.
- UI dev server: `cd ui && PORT=3001 BROWSER=none HOST=0.0.0.0 REACT_APP_API_HOST=http://localhost:3000 TSC_COMPILE_ON_ERROR=true npm start`

Register and login are `POST /register` and `POST /login` with `email` and `password` (password length at least 3). The UI talks to `REACT_APP_API_HOST` (default `http://localhost:3000`).

### Tests

API unit tests that CI runs, and that passed here:

```bash
cd api && npx jest --testPathPattern="services|auth\.test" --ci --passWithNoTests
```

`project.test.ts` is excluded by CI because of a pre-existing controller/service mismatch. This environment did not run the UI Jest suite.
