import { Component } from 'react';

import styles from './images-search.module.scss';
import ImagesSearchForm from './ImagesSearchForm/ImagesSearchForm';
import ImagesList from './ImagesList/ImagesList';

import { searchImages } from 'shared/services/images-api';

class ImagesSearch extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }
  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { items, loading, error, search } = this.state;
    const { searchImages, loadMore } = this;

    return (
      <>
        <header className={styles.searchbar}>
          <ImagesSearchForm onSubmit={searchImages} />
        </header>
        <ImagesList items={items} />
        {error && <p>Upsss</p>}
        {loading && <p>...Loading</p>}
        {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
      </>
    );
  }
}
export default ImagesSearch;
