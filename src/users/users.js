const { readFile, writeFile } = require("../utils/fs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const create = (req, res) => {
  const data = readFile("users");
  const { user_name, email, password } = req.body;

  const user = {
    user_id: v4(),
    user_name,
    email,
    password,
  };

  writeFile("users", [...data, user]);

  res.json({
    statusbar: "success",
    status: 200,
    token: jwt.sign(user.user_id, "12345"),
  });
};

const login = (req, res) => {
  const data = readFile("users");
  const { user_name, password } = req.body;
  console.log(user_name, password);

  
  const foundData = data.find((user) => user.user_name === user_name && user.password === password);

  if (!data) {
    res.json("User not found");
  }

  res.json({
    statusbar: "success",
    status: 200,
    data: foundData,
    // token: jwt.sign(foundData?.user_id, "12345"),
  });
};

const getUser = (req, res) => {
  const data = readFile("users");

  res.json(data);
};

module.exports = {
  create,
  getUser,
  login,
};
