import * as React from 'react';
import UploadCat from '../components/UploadCat';

interface AddCatPageProps {
  text: string;
}

export default class AddCatPage extends React.Component<AddCatPageProps, {}> {
  render() {
    return (
      <div>
        <h1>Let's add a cat</h1>
        <UploadCat />
      </div>
    );
  }
}
