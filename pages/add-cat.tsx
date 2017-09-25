import * as React from 'react';
import UploadCat from '../components/UploadCat';
import Layout from '../components/Layout';

interface AddCatPageProps {
  text: string;
}

export default class AddCatPage extends React.Component<AddCatPageProps, {}> {
  render() {
    return (
      <Layout title="Add cats">
        <h1>Let's add a cat</h1>
        <UploadCat />
      </Layout>
    );
  }
}
