import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("📆 API /api/goal-intervals", () => {
  let intervalId;

  it("✅ crea un intervallo valido", async () => {
    const res = await request(app).post("/api/goal-intervals").send({
      user_id: 1,
      start_date: "2024-04-01",
      end_date: "2024-04-30",
    });

    expect(res.status).to.equal(201);
    intervalId = res.body.id;
  });

  it("✅ filtra intervalli per date", async () => {
    const res = await request(app).get(
      "/api/goal-intervals?start_date=2024-04-01&end_date=2024-04-30"
    );
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("✅ elimina l’intervallo creato", async () => {
    const res = await request(app).delete(`/api/goal-intervals/${intervalId}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.include("eliminato");
  });
});
