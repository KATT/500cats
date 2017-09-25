import * as React from 'react';
import Link from 'next/link';

interface PaginationProps {
  prevCursor?: string;
  nextCursor?: string;
  total: number;
}

interface PaginationItemProps {
  name: string;
  text: string;
  cursor?: string;
}

const PaginationItem = ({ name, text, cursor }: PaginationItemProps) => {
  const child = <a>{text}</a>;
  if (cursor) {
    return <Link href={`?${name}=${cursor}`}>{child}</Link>;
  }
  return child;
};

export default ({ nextCursor, prevCursor, total }: PaginationProps) => (
  <div className="pagination">
    <span>
      <PaginationItem
        name="before"
        cursor={prevCursor}
        text="<< Previous Page"
      />
    </span>
    <span className="middle">Total items: {total}</span>
    <span className="right">
      <PaginationItem name="after" cursor={nextCursor} text="Next Page >>" />
    </span>
    <style jsx>{`
      .pagination {
        display: flex;
      }
      span {
        display: block;
        flex: 1;
      }
      .middle {
        text-align: center;
      }
      .right {
        text-align: right;
      }
    `}</style>
  </div>
);
