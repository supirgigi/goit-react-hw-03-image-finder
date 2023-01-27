import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31020043-5974e05673a68c0f99ec39a84',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});

export async function fetchImages(q, page) {
  const { data } = await instance.get(`/`, {
    params: {
      q,
      page,
    },
  });

  return data;
}
