import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '31020043-5974e05673a68c0f99ec39a84';

class pixabayApi {
  constructor() {
    this.page = 1;
    this.perPage = 12;
  }

  async fetchImages(searchQuery) {
    const response = await axios.get(`/`, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.page,
      },
    });

    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

const API = new pixabayApi();

export default API;
