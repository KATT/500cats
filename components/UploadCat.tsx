import * as React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface State {
  loading: boolean;
  catCount: number;
}

export default class UploadCat extends React.Component<{}, State> {
  state: State = {
    loading: false,
    catCount: 0,
  };
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

      this.setState(({ catCount }) => ({
        catCount: catCount + 1,
      }));
    } catch (e) {
      // TODO: error handling
    }

    this.setState({ loading: false });
  };

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    this.handleSubmit(file);
  };

  render() {
    const { loading, catCount } = this.state;

    return (
      <div>
        <p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.handleImageChange}
            disabled={loading}
          />
        </p>
        {catCount > 0 && (
          <p>
            Go view your added {catCount > 1 ? 'cats' : 'cat'} in{' '}
            <Link href="/">
              <a>List Cats</a>
            </Link>!
          </p>
        )}
      </div>
    );
  }
}
