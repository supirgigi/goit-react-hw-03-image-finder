import PropTypes from 'prop-types';
import { Component } from 'react';
import { ListItem, Img } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    selectedImg: null,
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

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
