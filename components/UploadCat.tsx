import * as React from 'react';
import axios from 'axios';

interface State {
  loading: boolean;
}

export default class UploadCat extends React.Component<{}, State> {
  state: State = { loading: false };
  handleSubmit = async (file: File) => {
    const formData = new FormData();

    formData.append('cat', file);

    this.setState({ loading: true });

    try {
      await axios.post('/api/cats', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('yay');
    } catch (e) {
      console.log('nay');
    }

    this.setState({ loading: false });
  };

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    this.handleSubmit(file);
  };

  render() {
    const { loading } = this.state;

    return (
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={this.handleImageChange}
        disabled={loading}
      />
    );
  }
}
