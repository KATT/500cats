// server.ts
import * as express from 'express';

const server = express();

server.get('/api/cat/speak', (req, res) => {
  res.send('meow');
});

export default server;
