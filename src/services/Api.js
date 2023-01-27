import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '31020043-5974e05673a68c0f99ec39a84';

export async function fetchImages(query, page) {
  const response = await axios.get(`/`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    },
  });

  return response.data;
}
