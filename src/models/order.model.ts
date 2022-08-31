import db from "../database";
import Order from "../types/order.type";

class OrderModel {
  // Create Order Endpoint
  async createOrder(o: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO orders(quantity, user_id, status) VALUES($1, $2, $3)RETURNING*`;
      const result = await connection.query(sql, [
        o.quantity,
        o.user_id,
        o.status,
      ]);
      const sql_J = `INSERT INTO makes(prod_id, order_id) VALUES($1, $2)RETURNING*`;
      const result_J = await connection.query(sql_J, [
        o.product_id,
        result.rows[0].id,
      ]);
      connection.release();
      result.rows[0].product_id = +o.product_id;
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to Create Order OF Product (${o.product_id})${
          (error as Error).message
        }`
      );
    }
  }

  // Show All Orders Endpoint
  async showAll(id: string): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT o.id,makes.prod_id,o.quantity,o.user_id,o.status
      FROM orders AS o 
      LEFT OUTER JOIN makes ON makes.order_id = o.id
      WHERE o.user_id = $1;`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving Orders of ${id} ${(error as Error).message}`
      );
    }
  }

  // Get Current Order Endpoint
  async getCurrent(id: string): Promise<Order> {
    try {
      const sql = `SELECT o.id,makes.prod_id,o.quantity,o.user_id,o.status
      FROM orders AS o 
      LEFT OUTER JOIN makes ON makes.order_id = o.id
      WHERE user_id =$1 ORDER BY id DESC LIMIT 1`;
      const connection = await db.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not Current Order${id},${(error as Error).message}`
      );
    }
  }

  //   // Delete (added) User Endpoint
  //   async delete(id: string): Promise<User> {
  //     try {
  //       const sql = `DELETE FROM users
  //       WHERE id=($1)
  //       RETURNING id, email, user_name, first_name, last_name`;
  //       const connection = await db.connect();
  //       const result = await connection.query(sql, [id]);
  //       connection.release();
  //       return result.rows[0];
  //     } catch (error) {
  //       throw new Error(
  //         `Could not delete user ${id},${(error as Error).message}`
  //       );
  //     }
  //   }

  // authenticate user
}
export default OrderModel;
