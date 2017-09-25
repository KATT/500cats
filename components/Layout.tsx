import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default ({ children, title = '500 cats' }) => (
  <div className="wrapper">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style jsx global>{`
      html,
      body {
        font-family: monospace;
      }
    `}</style>
    <header>
      <nav>
        <Link href="/" prefetch>
          <a>List cats</a>
        </Link>{' '}
        |{' '}
        <Link href="/add-cat" prefetch>
          <a>Add Cat</a>
        </Link>{' '}
        |{' '}
        <a href="https://github.com/KATT/500cats" className="external">
          About
        </a>
      </nav>
    </header>
    <main>{children}</main>

    <footer>
      <p>
        A stupid project by <a href="https://kattcorp.co.uk">KATTCORP</a>.
      </p>
    </footer>
    <style jsx>{`
      .wrapper {
        display: flex;
        min-height: 100vh;
        flex-direction: column;

        width: 640;
        max-width: 100%;

        margin: 10px auto;
      }
      a {
        text-decoration: none;
      }
      a.external:after {
        content: '[↗]';
        font-size: x-small;
        vertical-align: super;
      }

      main {
        flex: 1;
      }
    `}</style>
  </div>
);
