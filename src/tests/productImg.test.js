const request = require("supertest");
const app = require("../app");
const path = require("path");
require("../models");

const URL_USERS = "/api/v1/users";
const URL_PRODUCTIMG = "/api/v1/product_images";

let imageId;

beforeAll(async () => {
  const user = {
    email: "angel@angel.com",
    password: "angel1234",
  };

  const res = await request(app).post(`${URL_USERS}/login`).send(user);

  TOKEN = res.body.token;
});

test("POST -> 'URL_PRODUCTIMG', should status code 201 and res.body.url to be defined and res.body.file to be defined", async () => {
  const localImage = path.join(__dirname, "..", "public", "test.jpg");

  const res = await request(app)
    .post(URL_PRODUCTIMG)
    .attach("image", localImage)
    .set("Authorization", `Bearer ${TOKEN}`);

  imageId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.url).toBeDefined();
  expect(res.body.filename).toBeDefined();
});

test("GET -> 'URL_PRODUCTIMG', should status code 200 and res.body.length === 1 ", async () => {
  const res = await request(app)
    .get(URL_PRODUCTIMG)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("DELETE -> 'URL_PRODUCTIMG/:id', should status 204 ", async () => {
  const res = await request(app)
    .delete(`${URL_PRODUCTIMG}/${imageId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
});
