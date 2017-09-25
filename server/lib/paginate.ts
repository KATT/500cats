import * as Sequelize from 'sequelize';

export interface PaginationOptions {
  model: Sequelize.Model<any, any>;
  limit: number;
  before?: number | string;
  after?: number | string;
  cursorField?: string;
  cursorOrder?: 'DESC' | 'ASC';
}

export interface PaginatedResults {
  rows: any[];
  count: number;
  nextCursor?: string | number;
  prevCursor?: string | number;
}

function reverseOrder(order: 'DESC' | 'ASC', reverse: boolean) {
  if (!reverse) {
    return order;
  }
  if (order === 'ASC') {
    return 'DESC';
  }
  return 'ASC';
}

export default async function paginate({
  limit,
  model,
  before,
  after,
  cursorField = 'id',
  cursorOrder = 'DESC',
}: PaginationOptions): Promise<PaginatedResults> {
  let reverse: boolean = false;

  const where: any = {};
  if (before) {
    where[cursorField] = { $gt: before };
    reverse = true;
  }
  if (after) {
    where[cursorField] = { $lt: after };
  }

  let order = [[cursorField, reverseOrder(cursorOrder, reverse)]];

  let { rows, count } = {
    rows: await model.findAll({
      limit,
      order,
      where,
    }),
    count: await model.count(),
  };

  if (reverse) {
    rows = rows.reverse();
  }

  const prev = rows[0];
  const next = rows[rows.length - 1];

  // see if set has surrounding items
  const hasMore = {
    prev:
      prev &&
      (await model.findOne({
        where: {
          [cursorField]: { $gt: prev[cursorField] },
        },
      })),
    next:
      next &&
      (await model.findOne({
        where: {
          [cursorField]: { $lt: next[cursorField] },
        },
      })),
  };

  const nextCursor = hasMore.next && next.id;
  const prevCursor = hasMore.prev && prev.id;

  return { rows, count, nextCursor, prevCursor };
}
