import * as fs from 'fs';
import * as path from 'path';

const dir = path.join(__dirname, '/__bootstrap__');
const images = fs
  .readdirSync(dir)
  .filter(file => fs.statSync(path.join(dir, file)).isFile())
  .filter(file => file.endsWith('.jpg'))
  .slice(0, 100);

import { models } from './models';

async function main() {
  for (const index in images) {
    console.log(index + '...');
    const image = images[index];

    await models.Cat.createFromFile(image, `${dir}/${image}`);
  }
}

main()
  .then(() => console.log('yay'))
  .catch(e => console.error('errr', e))
  .then(() => process.exit());
