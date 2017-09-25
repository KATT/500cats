import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default ({ children, title = '500 cats' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>List cats</a>
        </Link>{' '}
        |{' '}
        <Link href="/add-cat">
          <a>Add Cat</a>
        </Link>{' '}
        | <a href="https://github.com/KATT/500cats">About</a>
      </nav>
    </header>

    {children}

    <footer>
      A stupid project by <a href="https://kattcorp.co.uk">KATTCORP</a>.
    </footer>
  </div>
);
