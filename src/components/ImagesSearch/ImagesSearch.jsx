import { Component } from 'react';
import axios from 'axios';

import styles from './images-search.module.scss';
import ImagesSearchForm from './ImagesSearchForm/ImagesSearchForm';
import ImagesList from './ImagesList/ImagesList';

class ImagesSearch extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
  };
  searchImages = ({ search }) => {
    this.setState({ search });
  };
  render() {
    const { items, loading, error } = this.state;
    const { searchImages } = this;

    return (
      <>
        {loading && <p>...Loading</p>}
        {error && <p>Upsss</p>}
        <header className={styles.searchbar}>
          <ImagesSearchForm onSubmit={searchImages} />
        </header>
        <ImagesList items={items} />
      </>
    );
  }
}
export default ImagesSearch;
