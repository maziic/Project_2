import ProductModel from "../../models/product.model";
import db from "../../database";
import Product from "../../types/product.type";
import supertest from "supertest";
import app from "../../server";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";

const productModel = new ProductModel();
const userModel = new UserModel();
const req = supertest(app);
let token = "";

describe("Product API Endpoints :", () => {
  const product = {
    name: "test",
    price: 100,
  } as Product;
  const user = {
    email: "test@test.com",
    user_name: "testUser",
    first_name: "Test",
    last_name: "User",
    password: "test123",
  } as User;
  beforeAll(async () => {
    const createdProduct = await productModel.create(product);
    const createdUser = await userModel.create(user);
    product.id = createdProduct.id;
    user.id = createdUser.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "ALTER SEQUENCE products_id_seq RESTART WITH 1; DELETE FROM products;ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM users;";
    await connection.query(sql);
    connection.release();
  });
  describe("Test Authentication API:", () => {
    it("Should Authenticate To Retrieve a token", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("content-type", "application/json")
        .send({
          user_name: "testUser",
          password: "test123",
        });

      expect(res.status).toBe(200);
      const { id, user_name, token: userToken } = res.body.data;
      expect(id).toBe(user.id);
      expect(user_name).toBe(user.user_name);
      token = userToken;
    });
  });
  describe("Test CRUD Procucts API", () => {
    it("should create new product", async () => {
      const res = await req
        .post("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "test2",
          price: 100,
        } as Product);
      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toBe("test2");
      expect(price).toBe("100");
    });

    it("should get list of all products", async () => {
      const res = await req
        .get("/api/products/")
        .set("Content-type", "application/json");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });

    it("Should Show A Specified Product", async () => {
      const res = await req
        .get(`/api/products/${product.id}`)
        .set("Content-type", "application/json");
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("test");
      expect(res.body.data.price).toBe("100");
    });
  });
});
