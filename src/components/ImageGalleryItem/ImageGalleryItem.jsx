import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { ListItem, Img } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    selectedImg: null,
  };

  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  handleClick = (src, alt) => {
    const selectedImg = {
      src,
      alt,
    };

    this.setState({ selectedImg });
  };

  closeModal = () => {
    this.setState({
      selectedImg: null,
    });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { selectedImg } = this.state;

    return (
      <ListItem>
        <Img
          onClick={() => this.handleClick(largeImageURL, tags)}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        />
        {selectedImg && (
          <Modal selectedImg={selectedImg} onClose={this.closeModal} />
        )}
      </ListItem>
    );
  }
}

export default ImageGalleryItem;
