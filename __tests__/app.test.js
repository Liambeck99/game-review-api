const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
const { expect } = require("@jest/globals");
const { timeStamp } = require("console");
const { toBeSortedBy } = require("jest-sorted");
const { array } = require("yargs");

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

describe("GET /api/reviews", () => {
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
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: returns single review object", () => {
    const REVIEW_ID = 1;
    return request(app)
      .get(`/api/reviews/${REVIEW_ID}`)
      .expect(200)
      .then(({ body }) => {
        const { review } = body;

        expect(review).toEqual(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: REVIEW_ID,
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(String),
          })
        );
      });
  });
  test.todo("400: returns error message if review_id invalid");
  test.todo("401: returns error message if review_id not found");
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("200: returns array of comments for associated review_id", () => {
    const REVIEW_ID = 2;
    return request(app)
      .get(`/api/reviews/${REVIEW_ID}/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(3);

        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });

        // check ordered by date desc
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
      });
  });
  test.todo("204: review has no comments so no content to return");
  test.todo("400: returns error message if review_id invalid");
  test.todo("401: returns error message if review_id not found");
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("201: returns newly posted comment", () => {
    const REVIEW_ID = 2;
    const new_comment = {
      username: "mallionaire",
      body: "This game fell off",
    };
    return request(app)
      .post(`/api/reviews/${REVIEW_ID}/comments`)
      .send(new_comment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;

        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: new_comment.username,
            body: new_comment.body,
            review_id: expect.any(Number),
          })
        );
      });
  });
  test.todo("400: returns error message if review_id invalid");
  test.todo("401: returns error message if review_id not found");
});

describe("PATCH /api/reviews/:review_id", () => {
  test("202: returns updated review", () => {
    const REVIEW_ID = 1;
    const UPDATE = { inc_votes: 10 };

    return request(app)
      .patch(`/api/reviews/${REVIEW_ID}`)
      .send(UPDATE)
      .expect(202)
      .then(({ body }) => {
        const { review } = body;

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
          })
        );
      });
  });
  test.todo("400: returns error message if review_id invalid");
  test.todo("401: returns error message if review_id not found");
});

describe("GET /api/users", () => {
  test("200: returns an array of objects containing user information", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users.length).toBeGreaterThanOrEqual(1);

        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});
