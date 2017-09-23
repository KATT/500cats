import * as req from 'supertest';
import server from '../server';

it('responds to /api/cat/speak', async () => {
  const res = await req(server).get('/api/cat/speak');

  expect(res.text).toBe('meow');
});
