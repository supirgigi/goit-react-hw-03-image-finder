import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

const Button = ({ text, onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
