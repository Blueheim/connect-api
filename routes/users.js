import express from 'express';
import { model, validate } from '../models/user';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await model.dbGetAll();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await model.dbGet(req.params.id);
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    // 400 Bad request
    return res.status(400).send(error.details[0].message);
  }

  if (await model.dbExist(req.body.email)) {
    return res.status(400).send('User already registered');
  }

  const user = await model.dbCreate(req.body);

  res.send(user);
});

export default router;
