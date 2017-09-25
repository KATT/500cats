import * as React from 'react';
import axios from 'axios';

import Layout from '../components/Layout';
import MyComponent from '../components/MyComponent';
import Pagination from '../components/Pagination';

interface IndexPageProps {
  data: any;
}

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  static async getInitialProps({ query, req }) {
    const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';

    const { data } = await axios.get(`${baseUrl}/api/cats`, { params: query });

    return { data };
  }

  render() {
    const { data } = this.props;
    // const nextCursor = data.pagination;
    const { nextCursor, prevCursor } = data.pagination;
    return (
      <Layout title="List cats">
        <h1>List of cats</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        <Pagination {...data.pagination} />
      </Layout>
    );
  }
}
