const request = require("supertest");
const app = require("../app");
let categoryId;

const URL_CATEGORIES = "/api/v1/categories";
const URL_USERS = "/api/v1/users";

let TOKEN;

beforeAll(async () => {
  const user = {
    email: "angel@angel.com",
    password: "angel1234",
  };

  const res = await request(app).post(`${URL_USERS}/login`).send(user);

  TOKEN = res.body.token;
});

test(`POST -> '${URL_CATEGORIES}' should return status code 201 req.body === category.name`, async () => {
  const category = {
    name: "Smartphones",
  };

  const res = await request(app)
    .post(URL_CATEGORIES)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(category);

  categoryId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(category.name);
});

test("GET -> 'URL_CATEGORIES', should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app).get(URL_CATEGORIES);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("DELETE -> 'URL_CATEGORIES/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${URL_CATEGORIES}/${categoryId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
