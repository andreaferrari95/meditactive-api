import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("🗑️ DELETE /api/users/:id", () => {
  let userId;
  let token;

  const user = {
    name: "Delete",
    surname: "Tester",
    email: `deleteuser_${Date.now()}@example.com`,
    password: "deletepass123",
  };

  before(async () => {
    const res = await request(app).post("/api/users").send(user);
    userId = res.body.id;

    const login = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    token = login.body.token;
  });

  it("✅ elimina utente con token valido", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include("eliminato");
  });

  it("❌ rifiuta eliminazione senza token", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).to.equal(401);
    expect(res.body.message).to.include("Token");
  });
});
