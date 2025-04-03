import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("API /api/users", () => {
  it("✅ dovrebbe creare un nuovo utente valido", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Test",
        surname: "User",
        email: `test_${Date.now()}@mail.com`,
        password: "123456",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body).to.include.keys("name", "surname", "email");
  });

  it("❌ dovrebbe bloccare la creazione con dati mancanti", async () => {
    const res = await request(app).post("/api/users").send({
      name: "",
      email: "nonvalida",
      password: "123",
    });

    expect(res.status).to.equal(422);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.be.an("array").that.is.not.empty;
  });
});
