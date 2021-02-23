const express = require("express");

//establece la conexion con mongoose
require("./db/mongoose");

const userRouters = require("./routers/user");
const taskRouters = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

/*
app.use((req, res, next) => {
  console.log("2");
  res.status(503).send("Site Currently Down");
});
*/
app.use(express.json());
app.use(userRouters);
app.use(taskRouters);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
/*
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abcd123" }, "testingcharactersecret", {
    expiresIn: "5 seconds",
  });
  console.log(token);

  const data = jwt.verify(token, "testingcharactersecret");
  console.log(data);
};

myFunction();
*/
