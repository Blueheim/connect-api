const express = require("express");
const AppError = require("../lib/AppError");
const _ = require("lodash");
const { model, validate } = require("../models/user");

const validateRequestBody = require("../middleware/validateRequestBody");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await model.dbGetAll();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await model.dbGetById(req.params.id);
  res.send(user);
});

// Sign up a new user
router.post("/", validateRequestBody(validate), async (req, res) => {
  if (await model.dbGetByEmail(req.body.email)) {
    throw new AppError(
      "RECORD_EXISTS",
      "User already exists in the database",
      true,
      response => response.status(400).send("User already registered")
    );
  }

  const user = await model.dbCreate(req.body, "local");

  const token = user.generateAuthToken();

  const authUser = await user.dbSetAuthToken(token);

  const resUser = _.pick(authUser, ["_id", "name", "email", "authToken"]);

  res.send(resUser);
});

module.exports = router;
