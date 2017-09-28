import * as fs from 'fs';
import * as path from 'path';

function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex: number = array.length,
    temporaryValue: T,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const dir = path.join(__dirname, '/__bootstrap__');
let images = fs
  .readdirSync(dir)
  .filter(file => fs.statSync(path.join(dir, file)).isFile())
  .filter(file => file.endsWith('.jpg'))
  .sort();
images = shuffle(images);

import { models, sequelize } from './models';

async function main() {
  console.log('Deleting everything..');
  await sequelize.sync({ force: true });

  console.log('Uploading cats!');
  for (const index in images) {
    const image = images[index];
    console.log(`${Number(index) + 1}/${images.length}\t - ${image}...`);

    await models.Cat.createFromFile(image, `${dir}/${image}`);
  }
}

main()
  .then(() => console.log('yay'))
  .catch(e => console.error('errr', e))
  .then(() => process.exit());
