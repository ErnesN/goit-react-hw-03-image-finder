import styles from './images-list.module.scss';

const ImagesSearchList = ({ items }) => {
  const elements = items.map(({ id, webformatURL }) => (
    <li key={id} className={styles.gallery__item}>
      <img className={styles.image} src={webformatURL} alt="" />
    </li>
  ));
  return <ul className={styles.gallery}>{elements}</ul>;
};

export default ImagesSearchList;

ImagesSearchList.deaultProps = {
  items: [],
};
