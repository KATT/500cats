// server.ts
import * as express from 'express';
import db, { models, sequelize } from './models';

sequelize.sync();

const server = express();

server.get('/api/cat/speak', (req, res) => {
  res.send('meow');
});

server.get('/api/cats', async (req, res) => {
  const cats = await models.Cat.findAll();
  res.send(cats);
});

export default server;
