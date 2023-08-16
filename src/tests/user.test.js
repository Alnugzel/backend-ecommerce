const request = require("supertest");
const app = require("../app");
let userId;

const URL_USERS = "/api/v1/users";
let TOKEN;

beforeAll(async () => {
  const user = {
    email: "angel@angel.com",
    password: "angel1234",
  };

  const res = await request(app).post(`${URL_USERS}/login`).send(user);

  TOKEN = res.body.token;
  console.log(TOKEN);
});

test("Get -> 'URL_USERS', should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_USERS)
    .set("Authorization", `Bearer ${TOKEN}`);

  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test(`POST -> '${URL_USERS}' should return status code 201 req.body === user.firstName`, async () => {
  const user = {
    firstName: "Angel",
    lastName: "Figuera",
    email: "angelfiguera0889@gmail.com",
    password: "angel1234",
    phone: "+584141234567",
  };

  const res = await request(app).post(URL_USERS).send(user);

  userId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test(`PUT -> '${URL_USERS}/:id' should return status code 200 and req.body.firstName === user.firstName `, async () => {
  const user = {
    firstName: "Angel",
  };

  const res = await request(app)
    .put(`${URL_USERS}/${userId}`)
    .send(user)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test("POST -> 'URL_USERS/login', should return status code 200, res.body.email === user.email and res.body.token to be defined", async () => {
  const user = {
    email: "angel@angel.com",
    password: "angel1234",
  };

  const res = await request(app).post(`${URL_USERS}/login`).send(user);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.user.email).toBe(user.email);
  expect(res.body.token).toBeDefined();
});

test("DELETE -> 'URL_USERS/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${URL_USERS}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
