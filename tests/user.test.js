const { TestScheduler } = require("jest");
const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const User = require("../src/models/user");
const mongoose = require("mongoose");

const usertTestTwo = {
  name: "mike",
  email: "mike@ex.com",
  password: "asdasoijhfpewoa",
};

const usertTestOneId = new mongoose.Types.ObjectId();

const usertTestOne = {
  _id: usertTestOneId,
  name: "Agustin Cabral",
  email: "agus@vexels.com",
  password: "holachequehaces",
  tokens: [
    { token: jwt.sign({ _id: usertTestOneId }, process.env.JWT_SECRET) },
  ],
};

beforeEach(async () => {
  console.log("beforeEach");
  //Vacio usuarios al comenzar los tests
  await User.deleteMany();
  //Agrego usuario para casos de prueba
  await new User(usertTestOne).save();
  console.log(usertTestOne);
});

test("Should signup a new user", async () => {
  await request(app).post("/users").send(usertTestTwo).expect(201);
});

test("Should login user usertTestTwo", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: usertTestOne.email, password: usertTestOne.password })
    .expect(200);
});

test("Should not login non existent user email", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: usertTestOne.email + "a", password: usertTestOne.password })
    .expect(400);
});

test("Should not login wrong password", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: usertTestOne.email, password: "wrong" })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${usertTestOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for user", async () => {
  await request(app)
    .get("/users/me")

    .send()
    .expect(401);
});

test("should delete account for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${usertTestOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete account for user", async () => {
  await request(app)
    .get("/users/me")

    .send()
    .expect(401);
});
