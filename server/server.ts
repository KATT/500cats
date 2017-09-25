// server.ts
import * as express from 'express';
import db, { models, sequelize } from './models';
import paginate from './lib/paginate';
import * as multer from 'multer';
import * as S3 from 'aws-sdk/clients/s3';
import * as fs from 'fs';

const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_REGION,
  S3_BUCKET,
} = process.env;
const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: S3_REGION,
});
// TODO: not very nice
const MAX_RESULTS_LIMIT = 2;

sequelize.sync();

const server = express();

interface Pagination {
  total: number;
  prevCursor?: string;
  nextCursor?: string;
}
interface APIEnvelope {
  pagination?: Pagination;
  data: Object | Object[];
}

server.get('/api/cat/speak', (req, res) => {
  res.send('meow');
});

function assert(obj: Object, key: string, expect: string) {
  const actual = typeof key;
  if (obj.hasOwnProperty(key) && typeof key !== expect) {
    throw new Error(`Expected ${key} to be a '${expect}' (actual ${actual})`);
  }
}

server.get('/api/cats', async (req, res) => {
  const model = models.Cat;
  assert(req.query, 'after', 'string');
  assert(req.query, 'before', 'string');

  const { before, after } = req.query;

  const { rows, count, nextCursor, prevCursor } = await paginate({
    model,
    limit: MAX_RESULTS_LIMIT,
    before,
    after,
  });

  let envelope: APIEnvelope = {
    data: rows,
    pagination: {
      nextCursor: nextCursor && String(nextCursor),
      prevCursor: prevCursor && String(prevCursor),
      total: count,
    },
  };

  res.send(envelope);
});

server.post(
  '/api/cats',
  multer({ dest: '/tmp' }).single('cat'),
  async ({ file }, res, next) => {
    try {
      const results = await s3
        .upload({
          Bucket: S3_BUCKET,
          Key: file.originalname,
          Body: fs.createReadStream(file.path),
          ACL: 'public-read',
        })
        .promise();

      const cat = await models.Cat.create({
        url: results.Location,
      });
      const response: APIEnvelope = {
        data: cat,
      };
      res.status(201).send(response);
    } catch (e) {
      console.error('e', e);
      next(e);
    }
  },
);

export default server;
