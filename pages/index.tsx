import * as React from 'react';
import MyComponent from '../components/MyComponent';
import Layout from '../components/Layout';
import axios from 'axios';

interface IndexPageProps {
  text: string;
}

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';

    const res = await axios.get(baseUrl + '/api/cat/speak');

    const text = res.data;

    return { text };
  }

  render() {
    return (
      <Layout title="List cats">
        <h1>List of cats</h1>
        <MyComponent />
      </Layout>
    );
  }
}
