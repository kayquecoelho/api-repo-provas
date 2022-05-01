import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/connection.js";
import dotenv from "dotenv";
import userFactory from "./authFactory/userFactory.js";
import userDataFactory from "./authFactory/userDataFactory.js";
dotenv.config();

describe("POST /auth/sign-up", () => {
  beforeEach(truncateUsersTable());

  afterAll(disconnectDatabase());

  it("should return status 422 given a empty body", async () => {
    const response = await supertest(app).post("/auth/sign-up");

    expect(response.status).toEqual(422);
  });

  it("should return status 201 given a valid body", async () => {
    const userData = userDataFactory();

    const response = await supertest(app).post("/auth/sign-up").send(userData);

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    expect(response.status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("should return status 409 given duplicate user", async () => {
    const userData = userDataFactory();

    await supertest(app).post("/auth/sign-up").send(userData);
    const response = await supertest(app).post("/auth/sign-up").send(userData);

    const user = await prisma.user.findMany({
      where: { email: userData.email },
    });

    expect(response.status).toEqual(409);
    expect(user.length).toEqual(1);
  });
});

describe("POST /auth/login", () => {
  beforeEach(truncateUsersTable());

  afterAll(disconnectDatabase());

  it("should return 422 given a empty body", async () => {
    const response = await supertest(app).post("/auth/login");

    expect(response.status).toEqual(422);
  });

  it("should return a token given a valid user", async () => {
    const userData = userDataFactory();

    await userFactory(userData);

    const response = await supertest(app).post("/auth/login").send(userData);

    expect(response.body.token).not.toBeNull();
  });

  it("should return status 401 given a valid body and wrong credentials", async () => {
    const userData = userDataFactory();

    await userFactory(userData);

    const response = await supertest(app)
      .post("/auth/login")
      .send({ ...userData, password: "123" });

    expect(response.status).toEqual(401);
  });
});

describe("POST /tests", () => {
  it.todo("should return status 401 given a invalid token",);

  it.todo("should return status 422 given an invalid body");

  it.todo("should return status 400 given invalid data");

  it.todo("should return status 201 given a valid body and persist test");
});

async function truncateUsersTable() {
  return await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
}

async function disconnectDatabase() {
  return await prisma.$disconnect();
}
