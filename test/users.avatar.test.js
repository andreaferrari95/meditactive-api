import request from "supertest";
import { expect } from "chai";
import path from "path";
import app from "../src/app.js";

describe("🖼️ API /api/users/:id/avatar", () => {
  it("✅ carica immagine avatar", async () => {
    const res = await request(app)
      .post("/api/users/1/avatar")
      .attach("avatar", path.resolve("test/assets/avatar.jpg"));

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("file");
    expect(res.body.file).to.include("/uploads/");
  });

  it("❌ errore se nessun file viene inviato", async () => {
    const res = await request(app).post("/api/users/1/avatar");
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include("Nessun file");
  });
});
