const express = require("express");
//establece la conexion con mongoose
require("./db/mongoose");
const userRouters = require("./routers/user");
const taskRouters = require("./routers/task");

const app = express();

app.use(express.json());
app.use(userRouters);
app.use(taskRouters);

module.exports = app;

/* suspension de sitio
app.use((req, res, next) => {
  console.log("2");
  res.status(503).send("Site Currently Down");
});
*/
