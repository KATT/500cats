import * as React from 'react';
import ImgixImg from './ImgixImg';
import Link from 'next/link';

export interface CatListProps {
  cats: CatListItemProps[];
}

export interface CatListItemProps {
  id: number;
  url: string;
}

export default (props: CatListProps) => (
  <ul>
    {props.cats.map(({ id, url }) => (
      <li key={String(id)}>
        <ImgixImg url={url} />
      </li>
    ))}

    <style jsx global>{`
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-gap: 0;
        grid-template-columns: 20% 20% 20% 20% 20%;
      }
    `}</style>
  </ul>
);
