import { CatModel } from './Cat';
import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize, Instance } from 'sequelize';
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

export interface CatAttributes {
  url: string;
}

export interface CatInstance extends Instance<CatAttributes> {
  dataValues: CatAttributes;
}

export interface CatModel
  extends SequelizeStatic.Model<CatAttributes, CatInstance> {
  createFromFile(fileName: string, filePath: string): Promise<CatInstance>;
}

export default function(sequelize: Sequelize, dataTypes: DataTypes): CatModel {
  let Cat: any = sequelize.define<CatInstance, CatAttributes>(
    'Cat',
    {
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

  Cat.createFromFile = async (fileName: string, filePath: string) => {
    const results = await s3
      .upload({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: fs.createReadStream(filePath),
        ACL: 'public-read',
      })
      .promise();

    const cat = await Cat.create({
      url: results.Location,
    });

    return cat;
  };

  return Cat;
}
