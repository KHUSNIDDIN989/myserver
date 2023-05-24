const express = require("express");
const cors = require("cors");
const app = express();

const { create, getUser, login } = require("./users/users");

app.use(cors("*"));
app.use(express.json());

app.get("/users", getUser);
app.post("/users", create);
app.post("/login", login);

app.listen(9000, () => console.log(9000));
