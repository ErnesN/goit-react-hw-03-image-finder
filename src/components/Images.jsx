import { Component } from 'react';
import axios from 'axios';

import styles from './images.module.scss';

class Images extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        'https://pixabay.com/api/?q=cat&page=1&key=32003673-6678ea5058f0970b487cd30b2&image_type=photo&orientation=horizontal&per_page=12'
      )
      .then(({ data }) => {
        this.setState({ images: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const { images, loading, error } = this.state;
    const elements = images.map(({ id, webformatURL }) => (
      <li key={id} className={styles.gallery__item}>
        <img className={styles.image} src={webformatURL} alt="" />
      </li>
    ));
    return (
      <>
        {loading && <p>...Loading</p>}
        {error && <p>Upsss</p>}
        <header className={styles.searchbar}>
          <form className={styles.form}>
            <button type="submit" className={styles.button}>
              <span className={styles.button__label}>Search</span>
            </button>

            <input
              className={styles.input}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
        <div>
          <ul className={styles.gallery}>{elements}</ul>
        </div>
      </>
    );
  }
}
export default Images;
