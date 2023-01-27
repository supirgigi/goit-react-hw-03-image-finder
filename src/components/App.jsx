import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { fetchImages } from 'services/Api';
import { Container } from './App.styled';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    const prevPage = prevState.page;
    const prevQuery = prevState.query;

    if (query !== prevQuery || page !== prevPage) {
      this.handleRequest();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async handleRequest() {
    try {
      this.setState({
        status: 'pending',
      });

      const { page, query } = this.state;
      const { hits, totalHits } = await fetchImages(query, page);

      if (totalHits === 0) {
        this.setState({ status: 'rejected' });
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (page === 1) {
        toast.success(`Found ${totalHits} images`);
      }

      if (totalHits < 12 * page) {
        this.setState({
          status: 'idle',
        });

        if (page > 1) {
          toast.info("You've reached the end of search results");
        }
      } else {
        this.setState({
          status: 'resolved',
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      this.setState({
        status: 'rejected',
      });

      toast.error(error.message);
    }
  }

  render() {
    const { images, status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <Button text="Load more" onClick={this.loadMore} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover={false}
          theme="light"
        />
      </Container>
    );
  }
}

export default App;
