CREATE TABLE makes(
    prod_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
CONSTRAINT PK_makes_prod_id_order_id PRIMARY KEY(prod_id, order_id),
CONSTRAINT FK_products_prod_id FOREIGN KEY(prod_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT FK_orders_order_id FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE
);