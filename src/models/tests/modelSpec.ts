import UserModel from "../user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();

describe("User Model", () => {
  describe("Authorization Module", () => {
    describe("Test methods exists", () => {
      it("should have an Authenticate User method", () => {
        expect(userModel.authenticate).toBeDefined();
      });
    });
  });
  describe("Test Authentication Logic", () => {
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
    it("authanticated method should return authanticated user", async () => {
      const authanticateduser = await userModel.authenticate(
        user.user_name,
        user.password as string
      );
      //   console.log(authanticateduser, user);
      expect(authanticateduser?.user_name).toBe(user.user_name);
      expect(authanticateduser?.first_name).toBe(user.first_name);
      expect(authanticateduser?.last_name).toBe(user.last_name);
    });
    it("Authenticate method should return null for wrong credentials", async () => {
      const authenticatedUser = await userModel.authenticate(
        "wrong_user",
        "wrong_pass"
      );
      expect(authenticatedUser).toBe(null);
    });
  });

  describe("of Users Module :", () => {
    it("should have get users index method", () => {
      expect(userModel.index).toBeDefined();
    });
    it("should have a show user info by id ", () => {
      expect(userModel.show).toBeDefined();
    });
    it("should have a create user method", () => {
      expect(userModel.create).toBeDefined();
    });
    it("should have a delete user method", () => {
      expect(userModel.delete).toBeDefined();
    });
    it("should have an authenticatation method", () => {
      expect(userModel.authenticate).toBeDefined();
    });

    describe("Test User Operations Logic :", () => {
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
      it("Create Method Should Create and return a new user", async () => {
        const createdUser = await userModel.create({
          email: "test2@test.com",
          user_name: "testUser2",
          first_name: "Test",
          last_name: "User",
          password: "test123",
        } as User);
        expect(createdUser).toEqual({
          id: createdUser.id,
          email: "test2@test.com",
          user_name: "testUser2",
          first_name: "Test",
          last_name: "User",
          password: createdUser.password,
        });
      });
      it("Index method should return all users with index", async () => {
        const user = await userModel.index();
        expect(user.length).toBe(2);
      });
      it("Show method should Return a User Info by ID", async () => {
        const returnUser = await userModel.show(user.id as unknown as string);
        expect(returnUser.id).toBe(user.id);
        expect(returnUser.user_name).toBe(user.user_name);
        expect(returnUser.first_name).toBe(user.first_name);
        expect(returnUser.last_name).toBe(user.last_name);
      });
      it("Delete Method Should Delete User by ID", async () => {
        const deletedUser = userModel.delete(user.id as unknown as string);
        expect((await deletedUser).id).toBe(user.id);
      });
    });
  });
});
