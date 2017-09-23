import * as React from 'react';
import MyComponent from '../components/MyComponent';
import 'isomorphic-fetch';

interface IndexPageProps {
  text: string;
}

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';

    const res = await fetch(baseUrl + '/api/cat/speak');
    const text = await res.text();

    return { text };
  }

  render() {
    return (
      <div>
        <h1>{this.props.text} world</h1>
        <MyComponent />
      </div>
    );
  }
}
