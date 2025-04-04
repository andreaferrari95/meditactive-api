import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("🔗 POST /api/goal-intervals/:id/goals", () => {
  let token;
  let userId;
  let goalId;
  let intervalId;

  const user = {
    name: "Assoc",
    surname: "User",
    email: `assocuser_${Date.now()}@example.com`,
    password: "assocpass123",
  };

  before(async () => {
    // Crea utente
    const resUser = await request(app).post("/api/users").send(user);
    userId = resUser.body.id;

    // Login
    const loginRes = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    token = loginRes.body.token;

    // Crea goal
    const goalRes = await request(app)
      .post("/api/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Assoc Goal",
        description: "test goal",
        type: "daily",
      });
    goalId = goalRes.body.id;

    // Crea intervallo
    const intervalRes = await request(app)
      .post("/api/goal-intervals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: userId,
        start_date: "2024-04-01",
        end_date: "2024-04-30",
      });
    intervalId = intervalRes.body.id;
  });

  it("✅ associa goal all'intervallo", async () => {
    const res = await request(app)
      .post(`/api/goal-intervals/${intervalId}/goals`)
      .set("Authorization", `Bearer ${token}`)
      .send({ goal_id: goalId });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.include("associato");
  });

  it("❌ rifiuta associazione senza token", async () => {
    const res = await request(app)
      .post(`/api/goal-intervals/${intervalId}/goals`)
      .send({ goal_id: goalId });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.include("Token");
  });
});
