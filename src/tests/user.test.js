const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
let userId;

const URL_USERS = "/api/v1/users";

const user = {
  firstName: "Angel",
  lastName: "Figuera",
  email: "angelfiguera0889@gmail.com",
  password: "angel1234",
  phone: "+584141234567",
};

test(`POST -> '${URL_USERS}' should return status code 201 req.body === user.firstName`, async () => {
  const res = await request(app).post(URL_USERS).send(user);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.name);
});
