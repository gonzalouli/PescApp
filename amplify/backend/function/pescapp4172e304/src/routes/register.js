const bodyParser = require("body-parser");
const express = require("express");
const register = express.Router();
const Amplify = require("aws-amplify");

register.post("/new", async (req, res) => {
  const mailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  const { name, surname, email, newpass, repeatpass } = req.body;

  if (name === "" || surname === "")
    return res.json({
      error: true,
      msg: "El nombre y apellido no deben de estar vacíos",
    });
  if (newpass !== repeatpass)
    return res.json({ error: true, msg: "Las contraseñas deben coincidir" });

  if (newpass.length < 8)
    return res.json({
      error: true,
      msg: "La contraseña debe de tener al menos 8 carácteres",
    });

  if (!mailReg.test(email))
    return res.json({ error: true, msg: "El email debe de ser valido" });
  //email = cognito username
  try {
    const signUpRes = await Amplify.signUp({
      email,
      newpass,
      attribute: {
        name: name,
        surname: surname,
      },
    });
  } catch (error) {
    return res.json({ error: true, msg: error.msg, cognito: error });
  }

  return res.json({
    error: false,
    msg: "Verifique su correo electrónico para completar el registro",
  });
});

module.exports = register;
