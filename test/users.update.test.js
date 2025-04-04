import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("🔄 PATCH /api/users/:id", () => {
  let userId;
  let token;

  const originalUser = {
    name: "Patch",
    surname: "User",
    email: `patchuser_${Date.now()}@example.com`,
    password: "patchpass123",
  };

  const updatedUser = {
    name: "Updated",
    surname: "UserMod",
    email: `updated_${Date.now()}@example.com`,
  };

  before(async () => {
    const createRes = await request(app).post("/api/users").send(originalUser);
    userId = createRes.body.id;

    const loginRes = await request(app).post("/api/auth/login").send({
      email: originalUser.email,
      password: originalUser.password,
    });

    token = loginRes.body.token;
  });

  it("✅ aggiorna l'utente con token valido", async () => {
    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUser);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include("aggiornato");
  });

  it("❌ blocca aggiornamento senza token", async () => {
    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .send({ name: "Hacker" });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.include("Token");
  });
});
