const Jwt = require("jsonwebtoken");

const generateToken = (id, username) => {
  return Jwt.sign({ id, username }, "TaskManager", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
