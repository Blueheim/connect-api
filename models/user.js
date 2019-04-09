import mongoose from 'mongoose';
import Joi from 'joi';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';

// ----------------------   CONFIG  --------------------------------
const collectionName = 'User';

// ----------------------   SCHEMA DEFINITION --------------------------------
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

// ----------------------   STATICS --------------------------------

// Crud operations

userSchema.statics.dbGetAll = async function() {
  return this.find()
    .sort('name')
    .exec();
};

userSchema.statics.dbGet = async function(id) {
  return this.findById(id).exec();
};

userSchema.statics.dbExist = async function(email) {
  return this.findOne({ email });
};

userSchema.statics.dbCreate = async function(user) {
  const document = new this(_.pick(user, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  document.password = await bcrypt.hash(document.password, salt);

  return _.pick(await document.save(), ['_id', 'name', 'email']);
};

// ----------------------  METHODS -----------------------------

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    config.get('jwtPrivateKey')
  );
  return token;
};

// ----------------------   MODEL CREATION --------------------------------
const User = mongoose.model(collectionName, userSchema);

// ----------------------   VALIDATION --------------------------------
function validate(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(user, schema);
}

export { User as model, validate };
