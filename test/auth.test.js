import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("🔐 API /api/auth/login", () => {
  const userData = {
    name: "Login",
    surname: "Tester",
    email: `logintest_${Date.now()}@example.com`,
    password: "testpass123",
  };

  before(async () => {
    await request(app).post("/api/users").send(userData);
  });

  it("✅ login valido restituisce token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it("❌ login fallisce con password errata", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: "wrongpass" });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.include("Credenziali");
  });
});
