import ContactItem from 'components/ContactItem';
import PropTypes from 'prop-types';
import { ContactsList } from './Contacts.styled';

const Contacts = ({ filter, onClick, contacts, inputRef }) => {

  if (contacts.length === 0) {
    return <h2>No contacts</h2>;
  } else if (inputRef === '') {
    return (
      <ContactsList>
        {contacts &&
          contacts.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              name={name}
              number={number}
              onClick={onClick}
              id={id}
            />
          ))}
      </ContactsList>
    );
  } else {
    return (
      <ContactsList>
        {filter &&
          filter.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              name={name}
              number={number}
              onClick={onClick}
              id={id}
            />
          ))}
      </ContactsList>
    );
  }
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
