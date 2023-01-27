import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const query = e.target.elements.query.value;

    if (query.toLowerCase().trim() === '') {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    onSubmit(query);
    e.target.reset();
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <AiOutlineSearch size={24} />
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            name="query"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
