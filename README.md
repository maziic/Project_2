# Storefront Backend Project

## Set up Database

### Create Databases

created the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`

- In psql run the following to create a user

  - `CREATE USER shopping_user WITH PASSWORD 'password123';`

- In Terminal following commands were needed to create migrations of the database

  - `npx db-migrate create users-table --sql-file`
  - `npx db-migrate create products-table --sql-file`
  - `npx db-migrate create orders-table --sql-file`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`yarn migrate-up`

### Packages

- Some of The packages user { express - typescript - b-migrate - bcrypt - jsonwebtoken - jasmine - supertest - dotenv }

### ENV

- ENV File Data Included{

PORT = 3000
NODE_ENV = dev
PGHOST='localhost'
PGUSER=postgres
PGDATABASE=store_dev
PGDATABASE_TEST=store_test
PGPASSWORD=admin
PGPORT=5432
SECRET = sercret-pass
SALT_ROUNDS = 10
TOKEN = token-secret

}

## Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Start APP

`yarn watch`

## Test APP

`yarn test`

## API Endpoints

#### Products

- Index: `'products/' [GET]` -- Which Gets All Products
- Show: `'products/:id' [GET]` -- Which Shows A Certain Product
- Create (args: Product)[token required]: `'products/' [POST] (token)`-- Which Creates A Product

#### Users

- Index [token required]: `'users/' [GET] (token)` -- Which Gets All Users
- Show [token required]: `'users/:id' [GET] (token)` -- Which Retrieves a certain User
- Create (args: User)[token required]: `'users/' [POST] (token)`-- Which Creates a User
- [ADDED] Authenticate (args: username,password) : `users/authenticate' [POST]`-- Which Authenticate a User and Return a Token
- [ADDED] Delete: `'user/:id [DELETE]`-- Which Deletes A User

#### Orders

- Index [token required]: `'orders/:user_id' [GET] (token)`-- Which Show All Orders
- Current Order by user [token required]: `'orders/current/:user_id' [GET] (token)`-- Which Show All Orders
- [ADDED] Create Order (args: Order)[token required]:`'orders/' [POST] (token)`-- Which Creates An Order

# Important Note

- The Data Shape Of Users is Changed to -email -user_name -first_name- last_name -password
  Which can be changed to -first_name- last_name -password As was Required but I kept like this as it made
  more sense while creating it and not knowing the required shape but can be changed back if needed.

  Thanks.
