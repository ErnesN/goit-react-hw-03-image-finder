import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    _key: '32003673-6678ea5058f0970b487cd30b2',
    _limit: 12,
    _image_type: 'photo',
    _orientation: 'horizontal',
  },
});

export const searchImages = async (q, _page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      _page,
    },
  });
  return data;
};
