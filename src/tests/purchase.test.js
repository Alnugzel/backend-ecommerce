const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
require("../models");

const URL_USERS = "/api/v1/users";
const URL_PURCHASE = "/api/v1/purchase";

let TOKEN;
let productBody;
let bodyCart;
let product;
let cart;
let userId;

beforeAll(async () => {
  const user = {
    email: "angel@angel.com",
    password: "angel1234",
  };
  const res = await request(app).post(`${URL_USERS}/login`).send(user);

  TOKEN = res.body.token;
  userId = res.body.user.id;

  productBody = {
    title: "productTest",
    description: "lorem20",
    price: 23,
  };

  product = await Product.create(productBody);

  bodyCart = {
    quantity: 1,
    userId,
    productId: product.id,
  };

  cart = await Cart.create(bodyCart);
});

test("POST 'URL_BASE', should return status code 201 and res.body.quantity === bodyCart.quantity", async () => {
  const res = await request(app)
    .post(URL_PURCHASE)
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(201);
  expect(res.body[0].quantity).toBe(cart.quantity);

  await cart.destroy();
  await product.destroy();
});
