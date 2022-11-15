const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
const { expect } = require("@jest/globals");

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

describe("GET /api/categories", () => {
  test("200: responds with array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        const lenGreaterThan1 = (categories.length >= 1);
        expect(lenGreaterThan1).toBe(true);
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});
