import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";
import { getToken } from "./token.helper.js"; // 👈 import del token helper

describe("🧘 API /api/goals", () => {
  let createdGoalId;
  let token;

  before(async () => {
    token = await getToken(); // 👈 prendi il token prima dei test
  });

  it("✅ dovrebbe creare un goal valido", async () => {
    const res = await request(app)
      .post("/api/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Meditazione Giornaliera",
        description: "10 minuti ogni mattina",
        type: "daily",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    createdGoalId = res.body.id;
  });

  it("❌ dovrebbe fallire se il titolo è mancante", async () => {
    const res = await request(app)
      .post("/api/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        type: "daily",
      });

    expect(res.status).to.equal(422);
  });

  it("✅ dovrebbe aggiornare il goal", async () => {
    const res = await request(app)
      .patch(`/api/goals/${createdGoalId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Meditazione Aggiornata",
        description: "20 minuti",
        type: "daily",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("✅ dovrebbe eliminare il goal", async () => {
    const res = await request(app)
      .delete(`/api/goals/${createdGoalId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include("eliminato");
  });
});
