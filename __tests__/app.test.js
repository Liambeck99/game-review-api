const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET /api", () => {
  test("200: responds with ok message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("ALL OK from GET /api");
      });
  });
});
