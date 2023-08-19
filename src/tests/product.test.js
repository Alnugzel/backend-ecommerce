const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
require("../models");

const URL_PRODUCTS = "/api/v1/products";
const URL_USERS = "/api/v1/users";

let TOKEN;
let product;
let category;
let productId;

beforeAll(async () => {
  const user = {
    email: "angel@angel.com",
    password: "angel1234",
  };

  const res = await request(app).post(`${URL_USERS}/login`).send(user);

  TOKEN = res.body.token;

  const categoryBody = {
    name: "Gatos",
  };

  category = await Category.create(categoryBody);

  product = {
    title: "Whiskas Pescado",
    description: "Alimento para gatos de pescado",
    price: "4.00",
    categoryId: category.id,
  };
});

test(`POST -> '${URL_PRODUCTS}' should return status code 201 req.body.title === product.title`, async () => {
  const res = await request(app)
    .post(URL_PRODUCTS)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("GET -> 'URL_PRODUCTS', should resturn status code 200 and res.body.legnth = 1", async () => {
  const res = await request(app).get(URL_PRODUCTS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].category).toBeDefined();
  expect(res.body[0].id).toBe(category.id);
});

test("GET FILTER -> 'URL_PRODUCTS?category=id', should resturn status code 200 and res.body.legnth = 1, res.body[0].category to be defined and res.body[0].category = category.id", async () => {
  const res = await request(app).get(`${URL_PRODUCTS}?category=${category.id}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].category).toBeDefined();
  expect(res.body[0].id).toBe(category.id);
});

test("GET ONE -> 'URL_PRODUCTS/:id', should resturn status code 200 and res.body.title = product.title", async () => {
  const res = await request(app).get(`${URL_PRODUCTS}/${productId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("PUT -> 'URL_PRODUCTS/:id', should resturn status code 200 and res.body.title = productUpdate.title", async () => {
  const productUpdate = {
    title: "Whiskas Carne",
  };

  const res = await request(app)
    .put(`${URL_PRODUCTS}/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(productUpdate.title);
});

test("DELETE -> 'URL_PRODUCTS/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${URL_PRODUCTS}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);

  await category.destroy();
});
