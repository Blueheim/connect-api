const AppError = require("../lib/AppError");
const _ = require("lodash");
const { model } = require("./user");

exports.getUsers = async (req, res) => {
  const users = await model.dbGetAll();
  res.send(users);
};

exports.getUserById = async (req, res) => {
  const user = await model.dbGetById(req.params.id);
  res.send(user);
};

exports.createUser = async (req, res) => {
  if (await model.dbGetByEmail(req.body.email)) {
    throw new AppError({
      name: "RECORD_EXISTS",
      description: "User already exists in the database",
      isOperational: true,
      httpStatusCode: 400,
      message: "User already registered"
    });
  }

  const user = await model.dbCreate(req.body, "local");

  const token = user.generateAuthToken();

  const authUser = await user.dbSetAuthToken(token);

  const resUser = _.pick(authUser, ["_id", "name", "email", "authToken"]);

  res.status(201).json(resUser);
};
