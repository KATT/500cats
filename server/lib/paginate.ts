import * as Sequelize from 'sequelize';

export interface PaginationOptions {
  model: Sequelize.Model<any, any>;
  limit: number;
  before?: number;
  after?: number;
}

export interface PaginatedResults {
  rows: any[];
  count: number;
}

export default async function paginate({
  limit,
  model,
}: PaginationOptions): Promise<PaginatedResults> {
  const { rows, count } = await model.findAndCountAll({
    limit,
    order: ['id', 'DESC'],
  });

  return { rows, count };
}
