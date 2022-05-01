import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/connection.js";
import dotenv from "dotenv";
import userFactory from "./authFactory/userFactory.js";
import userDataFactory from "./authFactory/userDataFactory.js";
import { gunzip } from "zlib";
import { TestData } from "../src/schemas/testSchema.js";
dotenv.config();

describe("POST /auth/sign-up", () => {
  beforeEach(truncateUsersTable);

  afterAll(disconnectDatabase);

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
  beforeEach(truncateUsersTable);

  afterAll(disconnectDatabase);

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
  beforeEach(truncateUsersTable);

  afterAll(disconnectDatabase);

  it("should return status 401 given a invalid token", async () => {
    const response = await supertest(app).post("/tests");

    expect(response.status).toEqual(401);
  });

  it("should return status 422 given a valid token and an invalid body", async () => {
    const token = await login();

    const response = await supertest(app).post("/tests").set("Authorization", token);

    expect(response.status).toEqual(422);
  });
  
  it("should return status 400 given a valid body with invalid data", async () => {
    const token = await login();
    
    const testData: TestData = {
      name: "2022 - First Attempt",
      pdfUrl: "http://www.google.com",
      disciplineId: 25,
      teacherId: 25,
      categoryId: 15
    }
    
    const response = await supertest(app).post("/tests").send(testData).set("Authorization", token);
    
    expect(response.status).toEqual(400);
  });
  
  it("should return status 201 given a valid body and persist test", async () => {
    const token = await login();
    
    const testData: TestData = {
      name: "2022 - First Attempt",
      pdfUrl: "http://www.google.com",
      disciplineId: 2,
      teacherId: 2,
      categoryId: 1
    }

    const response = await supertest(app).post("/tests").send(testData).set("Authorization", token);
    
    const test = await prisma.test.findFirst({
      where: {
        name: "2022 - First Attempt"
      }
    });

    expect(response.status).toEqual(201);
    expect(test).not.toBe(null);
  });
});

async function login(){
  const user = userDataFactory();
  
  await userFactory(user);

  const response = await supertest(app).post("/auth/login").send(user);

  return response.body.token;
}

async function truncateUsersTable() {
  return await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
}

async function disconnectDatabase() {
  return await prisma.$disconnect();
}
