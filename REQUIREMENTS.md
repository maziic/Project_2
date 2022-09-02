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

## Database Schema

### users

    id SERIAL PRIMARY KEY
    email VARCHAR(50) UNIQUE
    user_name VARCHAR(50) NOT NULL
    first_name VARCHAR(50) NOT NULL
    last_name VARCHAR(50) NOT NULL
    password VARCHAR(225) NOT NULL

### products

    id SERIAL PRIMARY KEY
    name VARCHAR(50) NOT NULL
    price NUMERIC NOT NULL

### orders

    id SERIAL PRIMARY KEY
    quantity INTEGER DEFAULT 1
    user_id INTEGER
    status mood NOT NULL
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE

### makes (orders_products)

    prod_id INTEGER NOT NULL
    order_id INTEGER NOT NULL
    CONSTRAINT PK_makes_prod_id_order_id PRIMARY KEY(prod_id, order_id)
    CONSTRAINT FK_products_prod_id FOREIGN KEY(prod_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
    CONSTRAINT FK_orders_order_id FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE

- note : makes is the junction table of the many-to-many relations ship between orders and products.
