import db from "../database";
import Product from "../types/product.type";
// import config from "../config";

class ProductModel {
  // Create product Endpoint
  async create(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO products(name,price) VALUES($1,$2)RETURNING*`;
      const result = await connection.query(sql, [p.name, p.price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create(${p.name})${(error as Error).message}`);
    }
  }

  // Index Products Endpoint
  async index(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * from products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving products${(error as Error).message}`
      );
    }
  }

  // Show Products Endpoint
  async show(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products
     WHERE id=($1)`;
      const connection = await db.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find product${id},${(error as Error).message}`
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
export default ProductModel;
