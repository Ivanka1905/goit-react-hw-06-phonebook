import ContactItem from 'components/ContactItem';
import PropTypes from 'prop-types';
import { ContactsList } from './Contacts.styled';
import { useSelector} from 'react-redux'
import { getContact } from 'redux/contactsSlice';

const Contacts = () => {
  const contacts = useSelector(getContact);

  return (
    <ContactsList>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name.trim()}
          number={number}
          // deleteContact={deleteContact}
          id={id}
        />
      ))}
    </ContactsList>
  );
};

Contacts.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};

export default Contacts;
