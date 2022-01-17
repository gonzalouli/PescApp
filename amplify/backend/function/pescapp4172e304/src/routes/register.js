const bodyParser = require("body-parser");
const express = require("express");
const register = express.Router();
const Amplify = require("aws-amplify");

register.post("/new", async (req, res) => {
  let error = false;

  if (req.body.name === "" || req.body.surname === "") error = true;
  if (req.body.newpass !== req.body.repeatpass) error = true;

  if (error) return res.json(true);
  //email = cognito username
  await Amplify.signUp(req.body.email, req.body.newpass, {
    name: req.body.name,
    surname: req.body.surname,
  });

  return res.json(false);
});

module.exports = register;
