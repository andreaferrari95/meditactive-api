import request from "supertest";
import app from "../src/app.js";

let token;

export const getToken = async () => {
  if (token) return token;

  const userData = {
    name: "TestAuth",
    surname: "User",
    email: `authuser${Date.now()}@example.com`,
    password: "authpass123",
  };

  await request(app).post("/api/users").send(userData);

  const res = await request(app).post("/api/auth/login").send({
    email: userData.email,
    password: userData.password,
  });

  if (!res.body.token) {
    throw new Error("❌ Login fallito: token non ricevuto");
  }

  token = res.body.token;
  return token;
};
