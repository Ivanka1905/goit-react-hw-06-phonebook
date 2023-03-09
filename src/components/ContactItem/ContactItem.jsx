import PropTypes from 'prop-types';
import { ListItem, Button, Span } from './ContactItem.styled';
import { useDispatch } from 'react-redux'
import { deleteContactAction } from 'redux/contactsSlice';

const ContactItem = ({ name, number, id }) => {

  const dispatch = useDispatch();
  return (
    <ListItem>
      <span>
        &#9900; {name}: <Span>{number}</Span>
      </span>
      <Button type="button" onClick={() => dispatch(deleteContactAction(id))}>
        Delete
      </Button>
    </ListItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  deleteContact: PropTypes.func,
  id: PropTypes.string,
};

export default ContactItem;
