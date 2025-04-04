import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("🔍 GET /api/goal-intervals (filtri)", () => {
  let token;
  let userId;
  let goalId;
  let intervalId;

  const user = {
    name: "Filtro",
    surname: "User",
    email: `filtro_${Date.now()}@example.com`,
    password: "filtropass123",
  };

  before(async () => {
    const resUser = await request(app).post("/api/users").send(user);
    userId = resUser.body.id;

    const login = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    token = login.body.token;

    const resGoal = await request(app)
      .post("/api/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Filtro Goal",
        description: "Per filtrare",
        type: "monthly",
      });
    goalId = resGoal.body.id;

    const resInterval = await request(app)
      .post("/api/goal-intervals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: userId,
        start_date: "2024-04-01",
        end_date: "2024-04-30",
      });
    intervalId = resInterval.body.id;

    await request(app)
      .post(`/api/goal-intervals/${intervalId}/goals`)
      .set("Authorization", `Bearer ${token}`)
      .send({ goal_id: goalId });
  });

  it("✅ restituisce intervalli filtrati per goal_id e date", async () => {
    const res = await request(app)
      .get(
        `/api/goal-intervals?goal_id=${goalId}&start_date=2024-04-01&end_date=2024-04-30`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
    expect(res.body[0]).to.have.property("id");
  });
});
