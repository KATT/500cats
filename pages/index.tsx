import * as React from 'react';
import axios from 'axios';

import Layout from '../components/Layout';
import MyComponent from '../components/MyComponent';
import Pagination from '../components/Pagination';
import CatList from '../components/CatList';

interface IndexPageProps {
  results: any;
}

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  static async getInitialProps({ query, req }) {
    const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';

    const { data: results } = await axios.get(`${baseUrl}/api/cats`, {
      params: query,
    });

    return { results };
  }

  render() {
    const { results } = this.props;
    // const nextCursor = data.pagination;
    const { pagination, data } = results;
    return (
      <Layout title="List cats">
        <h1>List of cats</h1>
        <CatList cats={data} />
        <Pagination {...pagination} />
      </Layout>
    );
  }
}
