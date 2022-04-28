import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/connection.js";
import dotenv from "dotenv";
import userFactory from "./authFactory/userFactory.js";
import userDataFactory from "./authFactory/userDataFactory.js";
dotenv.config();

describe("POST /auth/sign-up", () => {
  beforeEach(
    async () => await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
  );
  afterAll(async () => {
    await prisma.$disconnect();
  });

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
  beforeEach(
    async () => await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
  );
  afterAll(async () => {
    await prisma.$disconnect();
  });

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

    const response = await supertest(app).post("/auth/login").send({...userData, password: '123'});

    expect(response.status).toEqual(401);
  });
});
