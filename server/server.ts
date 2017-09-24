// server.ts
import * as express from 'express';
import db, { models, sequelize } from './models';
import paginate from './lib/paginate';
import * as multer from 'multer';

// TODO: not very nice
const MAX_RESULTS_LIMIT = 10;

sequelize.sync();

const server = express();

interface Pagination {
  prevCursor?: string;
  nextCursor?: string;
}
interface APIEnvelope {
  pagination: Pagination;
  data: Object | Object[];
}

server.get('/api/cat/speak', (req, res) => {
  res.send('meow');
});

server.get('/api/cats', async (req, res) => {
  const model = models.Cat;
  const { rows, count } = await paginate({
    model,
    limit: MAX_RESULTS_LIMIT,
  });

  // FIXME figure out cursors
  let nextCursor, prevCursor;

  let envelope: APIEnvelope = {
    data: rows,
    pagination: {
      nextCursor,
      prevCursor,
    },
  };

  res.send(envelope);
});

server.post('/api/cats', multer({ dest: '/tmp' }).single('cat'), (req, res) => {
  console.log(req.file);
  res.sendStatus(201);
});

export default server;
