import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import API from 'services/Api';
import { List } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
  };

  static propTypes = {
    searchQuery: PropTypes.string,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const prevQuery = prevProps.searchQuery;

    if (searchQuery !== prevQuery) {
      this.setState({
        images: [],
        status: 'pending',
      });

      API.resetPage();
      this.handleRequest();
    }
  }

  loadMore = () => {
    this.setState({
      status: 'pending',
    });

    this.handleRequest();
  };

  async handleRequest() {
    const { searchQuery } = this.props;

    try {
      const { hits, totalHits } = await API.fetchImages(searchQuery);

      if (totalHits === 0) {
        this.setState({ status: 'rejected' });
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (totalHits < API.perPage * API.page) {
        this.setState({
          status: 'idle',
        });

        if (API.page > 1) {
          toast("You've reached the end of search results");
        }
      } else {
        this.setState({
          status: 'resolved',
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));

      API.incrementPage();
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
      <>
        <List>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </List>
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <Button text="Load more" onClick={this.loadMore} />
        )}
      </>
    );
  }
}

export default ImageGallery;
