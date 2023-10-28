require("dotenv").config();
const mongoose = require("mongoose");
const supertestReq = require("supertest");
const app = require("../../app");

const { DB_TEST_HOST } = process.env;

const users = {
  validUser: {
    email: "test@test.com",
    password: "123456",
  },
  invalidUser: {
    email: "invalid@test.com",
    password: "123456",
  },
  invalidEmailUser: {
    email: "invalidEmail",
    password: "123456",
  },
};

describe("User authentication with email", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => console.log("DB test host connected"))
      .catch((error) => console.log(error));
  });

  afterAll(async () => {
    await mongoose
      .disconnect()
      .then(() => console.log("DB test host disconnected"))
      .catch((error) => console.log(error));
  });

  it("should successfully log in and return expected user data", async () => {
    const result = await supertestReq(app)
      .post("/api/auth/login")
      .send(users.validUser);

    expect(result.statusCode).toBe(200);

    expect(result.body).toHaveProperty("token");
    expect(typeof result.body.token).toBe("string");

    expect(result.body).toHaveProperty("user");
    expect(result.body.user).toHaveProperty("username");
    expect(result.body.user).toHaveProperty("email");
    expect(result.body.user).toHaveProperty("subscription");
    expect(typeof result.body.user.username).toBe("string");
    expect(typeof result.body.user.email).toBe("string");
    expect(typeof result.body.user.subscription).toBe("string");
  });

  it("should return an error with invalid email", async () => {
    const result = await supertestReq(app)
      .post("/api/auth/login")
      .send(users.invalidUser);
    expect(result.statusCode).toBe(401);
    expect(result.body).toHaveProperty("message");
    expect(typeof result.body.message).toBe("string");
  });

  it("should return an error with missing email and password", async () => {
    const result = await supertestReq(app).post("/api/auth/login").send({});
    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("message");
    expect(typeof result.body.message).toBe("string");
  });

  it("should return error with invalid email format", async () => {
    const result = await supertestReq(app)
      .post("/api/auth/login")
      .send(users.invalidEmailUser);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message");
    expect(typeof result.body.message).toBe("string");
  });
});
