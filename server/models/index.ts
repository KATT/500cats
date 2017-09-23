import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import { CatAttributes, CatInstance } from './Cat';
import { Sequelize } from 'sequelize';

export interface SequelizeModels {
  Cat: SequelizeStatic.Model<CatInstance, CatAttributes>;
}

const {
  PG_MAIN_DB = '500cats',
  PG_MAIN_USER = 'postgres',
  PG_MAIN_PASSWORD = '',
  PG_MAIN_HOST = 'localhost',
  SCAFFOLD,
  NODE_ENV,
} = process.env;

// Initialize sequelize instance with PG connection
class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: Sequelize;

  constructor() {
    this._basename = path.basename(module.filename);

    this._sequelize = new SequelizeStatic(
      PG_MAIN_DB,
      PG_MAIN_USER,
      PG_MAIN_PASSWORD,
      {
        dialect: 'postgres',
        host: PG_MAIN_HOST,
        logging: true,
      },
    );
    this._models = {} as any;

    fs
      .readdirSync(__dirname)
      .filter(file => fs.statSync(path.join(__dirname, file)).isFile())
      .filter(file => !file.startsWith('index.'))
      .filter(file => file.endsWith('.js'))
      .forEach((file: string) => {
        console.log('importing', file);
        let model = this._sequelize.import(path.join(__dirname, file));
        this._models[(model as any).name] = model;
      });

    Object.keys(this._models).forEach((modelName: string) => {
      if (typeof this._models[modelName].associate === 'function') {
        this._models[modelName].associate(this._models);
      }
    });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();

export default database;
