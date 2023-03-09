import { useRef } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addContactAction, filterContactAction } from 'redux/contactsSlice';
import Form from 'components/Form';
import Contacts from 'components/Contacts';
import Filter from 'components/Filter';
import { Container } from 'components/App.styled';

const App = () => {
  const inputRef = useRef('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contact);
  const filter = useSelector(state => state.contacts.filter);

  const addNewContact = e => {
      e.preventDefault();
      
    const name = e.target.name.value;
    const number = e.target.number.value;

    if (contacts.find(contacts => contacts.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(
        addContactAction( [...contacts,
          {id: nanoid(), name, number }, ])
      );
      };

      e.target.name.value = '';
      e.target.number.value = '';
  };

  const filterContacts = e => {
    const searchValue = e.target.value.toLocaleLowerCase();
    inputRef.current = searchValue;
    const visibleContacts = contacts.filter(name =>
      name.name.toLocaleLowerCase().includes(searchValue)
    );
    dispatch(filterContactAction(visibleContacts));
  };

    const deleteContact = deleteId => {
      dispatch(addContactAction(contacts.filter(c => c.id !== deleteId)))
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Filter
        onChange={filterContacts}
      />
      <Contacts
        inputRef={inputRef.current}
        filter={filter}
        contacts={contacts}
        onClick={deleteContact}
      />
    </Container>
  );
};

App.propTypes = {
  filterContacts: PropTypes.func,
  getDataOnSubmit: PropTypes.func,
  changeFilter: PropTypes.func,
  deleteContact: PropTypes.func,
};

export default App;
