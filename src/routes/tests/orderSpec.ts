import ProductModel from "../../models/product.model";
import db from "../../database";
import Product from "../../types/product.type";
import supertest from "supertest";
import app from "../../server";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import OrderModel from "../../models/order.model";
import Order from "../../types/order.type";

const productModel = new ProductModel();
const userModel = new UserModel();
const orderModel = new OrderModel();
const req = supertest(app);
let token = "";

describe("Order API Endpoints :", () => {
  //Initialization Of all Needed Objects
  const order = {
    product_id: 1,
    quantity: 1,
    user_id: 1,
    status: "active",
  } as Order;

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
    const createOrder = await orderModel.createOrder(order);
    product.id = createdProduct.id;
    user.id = createdUser.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "ALTER SEQUENCE orders_id_seq RESTART WITH 1; DELETE FROM orders;ALTER SEQUENCE products_id_seq RESTART WITH 1; DELETE FROM products;ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM users;";
    await connection.query(sql);
    connection.release();
  });
  describe("Initialization Of Orders:", () => {
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
    it("Should Create New Product", async () => {
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
  });
  describe("Test CRUD Products API", () => {
    it("should create Order", async () => {
      const res = await req
        .post("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: 1,
          quantity: 1,
          user_id: 1,
          status: "active",
        } as Order);
      expect(res.status).toBe(200);
      const { product_id, quantity, user_id, status } = res.body.data;
      expect(product_id).toBe(1);
      expect(quantity).toBe(1);
      expect(user_id).toBe(1);
      expect(status).toBe("active");
    });

    it("Should Get All Orders OF A User", async () => {
      const res = await req
        .get(`/api/orders/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });

    it("Should Return The Current Order Of A User", async () => {
      const res = await req
        .get(`/api/orders/current/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      const { product_id, quantity, user_id, status } = res.body.data;
      expect(product_id).toBe(1);
      expect(quantity).toBe(1);
      expect(user_id).toBe(1);
      expect(status).toBe("active");
    });
  });
});
