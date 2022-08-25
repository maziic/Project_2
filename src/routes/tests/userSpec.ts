import UserModel from "../../models/user.model";
import db from "../../database";
import User from "../../types/user.type";
import supertest from "supertest";
import app from "../../server";

const userModel = new UserModel();
const req = supertest(app);
let token = "";

describe("User API Endpoints :", () => {
  const user = {
    email: "test@test.com",
    user_name: "testUser",
    first_name: "Test",
    last_name: "User",
    password: "test123",
  } as User;
  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM users;";
    await connection.query(sql);
    connection.release();
  });
  describe("Test Authentication API:", () => {
    it("Should be able to Authenticate and return a token", async () => {
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
    it("Should fail On wrong user_name", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("content-type", "application/json")
        .send({
          user_name: "wrong_user",
          password: "test123",
        });
      expect(res.status).toBe(401);
    });
  });
  describe("Test CRUD API methods", () => {
    it("should create new user", async () => {
      const res = await req
        .post("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "test2@test2.com",
          user_name: "testUser2",
          first_name: "Test2",
          last_name: "User2",
          password: "test123",
        } as User);
      expect(res.status).toBe(200);
      const { email, user_name, first_name, last_name } = res.body.data;
      expect(email).toBe("test2@test2.com");
      expect(user_name).toBe("testUser2");
      expect(first_name).toBe("Test2");
      expect(last_name).toBe("User2");
    });

    it("should get list of users", async () => {
      const res = await req
        .get("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });

    it("should get user info", async () => {
      const res = await req
        .get(`/api/users/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user_name).toBe("testUser");
      expect(res.body.data.email).toBe("test@test.com");
    });

    it("should delete user", async () => {
      const res = await req
        .delete(`/api/users/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(user.id);
    });
  });
});
