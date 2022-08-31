# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index ( http://localhost:3000/api/products/ Get Method )
- Show (http://localhost:3000/api/products/:user_ID Get Method [args user_id] )
- Create [token required] (http://localhost:3000/api/products/ Post Method [args Product] )

#### Users

- Index [token required] ( http://localhost:3000/api/users/ Get Method )
- Show [token required] ( http://localhost:3000/api/users/:user_ID Get Method [args user_id] )
- Create N[token required] ( http://localhost:3000/api/users/ Post Method [args User] )
- [ADDED] Authenticate ( http://localhost:3000/api/users/authenticate Post Method [args user_name , password] )
- [ADDED] Delete ( http://localhost:3000/api/users/:user_ID Delete Method [args user_id] )

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- email
- user_name
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
