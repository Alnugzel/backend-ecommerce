const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

let userId;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJBbmdlbCIsImxhc3ROYW1lIjoiRmlndWVyYSIsImVtYWlsIjoiYW5nZWxmaWd1ZXJhMDg4OUBnbWFpbC5jb20iLCJwaG9uZSI6Iis1ODQxNDEyMzQ1NjciLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTE1VDEzOjM5OjQ4LjYwOVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTE1VDEzOjM5OjQ4LjYwOVoifSwiaWF0IjoxNjkyMTA2ODAxLCJleHAiOjE2OTIxOTMyMDF9.GhLBmoJYhkLgYPavorHhHsNNhEgqWKl7MqdH0_RkVig";
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
  expect(res.body.firstName).toBe(user.firstName);
});

// test(`POST -> '${URL_USERS}' should return status code 201 req.body === user.name`);

// test(`GET -> '${URL_USERS}' should return status code 200`, async () => {
//   const res = await request(app)
//     .set("Autorization", "Bearer " + token)
//     .get(URL_USERS);

//   expect(res.status).toBe(200);
// });
