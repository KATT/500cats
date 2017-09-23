import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize, Instance } from 'sequelize';

export interface CatAttributes {
  caption: string;
  url: string;
}

export interface CatInstance extends Instance<CatAttributes> {
  dataValues: CatAttributes;
}

export default function(
  sequelize: Sequelize,
  dataTypes: DataTypes,
): SequelizeStatic.Model<CatInstance, CatAttributes> {
  let Cat = sequelize.define<CatInstance, CatAttributes>(
    'Cat',
    {
      caption: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      indexes: [],
      classMethods: {},
    },
  );

  return Cat;
}
