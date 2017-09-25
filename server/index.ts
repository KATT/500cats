// server.ts
import server from './server';
import * as next from 'next';

function ensureEnvKeys(keys: string[]) {
  const missingKeys = keys.filter(key => !process.env[key]);
  if (missingKeys.length > 0) {
    throw new Error(`Missing ENV key(s): ${missingKeys.sort().join(', ')}`);
  }
}

ensureEnvKeys([
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
  'S3_REGION',
  'S3_BUCKET',
]);

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
