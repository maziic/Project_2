import supertest from "supertest";
import app from "../server";

// creaate a request object
const request = supertest(app);

describe("Test endpoint server", () => {
  it("get the / endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
