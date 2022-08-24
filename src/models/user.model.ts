import db from "../database";
import bcrypt from "bcrypt";
import User from "../types/user.type";
import config from "../config";

const hashPass = (password: string) => {
  //const salt = config.salt as unknown as number;
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.peper}`, salt);
};

class UserModel {
  // Create User Endpoint
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users(email,user_name,first_name,last_name,password)
            values($1,$2,$3,$4,$5)returning*`;

      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password),
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        "Unable to create(${u.user_name]):${(error as Error).message}"
      );
    }
  }

  // Index Users Endpoint
  async index(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql =
        "SELECT id,email,user_name,first_name,last_name,password from users";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users${(error as Error).message}`);
    }
  }

  // Show User Endpoint
  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT id,email,user_name,first_name,last_name FROM users
     WHERE id=($1)`;
      const connection = await db.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user${id},${(error as Error).message}`);
    }
  }

  // Delete (added) User Endpoint
  async delete(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users
      WHERE id=($1)
      RETURNING id, email, user_name, first_name, last_name`;
      const connection = await db.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete user ${id},${(error as Error).message}`
      );
    }
  }

  // authenticate user

  async authenticate(user_name: string, password: string) {
    try {
      const connect = await db.connect();
      const sql = "SELECT password FROM users WHERE user_name=$1";
      const result = await connect.query(sql, [user_name]);
      if (result.rows.length) {
        const { password: hashPass } = result.rows[0];
        const checkpass = bcrypt.compareSync(
          `${password}${config.peper}`,
          hashPass
        );
        if (checkpass) {
          const userInfo = await connect.query(
            "SELECT * FROM users WHERE user_name=($1)",
            [user_name]
          );
          return userInfo.rows[0];
        }
        connect.release();
        return null;
      }
    } catch (error) {
      throw new Error(`unable to login: ${(error as Error).message}`);
    }
  }
}
export default UserModel;
