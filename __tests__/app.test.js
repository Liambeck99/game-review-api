const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
const { expect } = require("@jest/globals");
const { timeStamp } = require("console");

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
        const lenGreaterThan1 = categories.length >= 1;
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

describe("GET /api/reveiws", () => {
  test("200: returns an array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        // check array is not of length 0
        const lenGreaterThan1 = reviews.length >= 1;
        expect(lenGreaterThan1).toBe(true);
        // verify object structure
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
        // check ordered by date desc
        const datesArray = reviews.map((review) =>
          Date.parse(review.created_at)
        );
        for (let i = 1; i < datesArray.length; i++) {
          expect(datesArray[i] <= datesArray[i - 1]).toBe(true);
        }
      });
  });
});
