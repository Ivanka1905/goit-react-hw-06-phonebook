import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  addContactAction,
  getContact,
  contactsReducer,
  getFilter,
  filterContactAction,
  deleteContactAction,
} from 'redux/contactsSlice';
import Form from './Form';
import Contacts from './Contacts';
import Filter from './Filter';
import { Container } from 'components/App.styled';

const App = () => {
  const inputRef = useRef('');
  const contacts = useSelector(getContact);
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  //   const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  const addNewContact = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;

    console.log(name, number)

    if (contacts.find(contacts => contacts.name === name)) {
      alert(`${name} is already in contacts.`);
      return contacts;
    } else {
      dispatch(
        addContactAction([
          {
            id: nanoid(),
            name,
            number,
          },
          ...contacts,
        ])
      );
    }
    // handleSubmit(name, number)
    //   const { name, value } = event.target;
    //   switch (name) {
    //     case 'name':
    //       setName(value);
    //       break;
    //     case 'number':
    //       setNumber(value);
    //       break;
    //     default:
    //       console.log('Error');
    //   }
  };

  // const handleSubmit = (a, b) => {
  //   const a = '';
  //   const b = '';
  //   return a
  //   // e.preventDefault();
  //   // getData({ name, number });
  //   // setName('');
  //   // setNumber('');
  // };

  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem('contact')) ?? [];
  // });
  // const [filterLabel, setFilterLabel] = useState('');

  // const getDataOnSubmit = data => {
  //   const checkName = contacts.find(({ name }) => name === name);
  //   // setContacts(() => {
  //     // if (contacts.find(({ name }) => name === name)) {
  //     //   alert(`${name} is already in contacts.`);
  //     //   return contacts;
  //     // } else dispatch(addContactAction(
  //     // [{
  //     //   id: nanoid(),
  //     //   ...data,
  //     // }, ...contacts]))

  // // });
  // };

  const filterContacts = e => {
    const searchValue = e.target.value.toLocaleLowerCase();
    // dispatch(filterContactAction(lowerCase))
    inputRef.current = searchValue;
    const visibleContacts = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchValue)
    );
    dispatch(filterContactAction(visibleContacts));
    // return visibleContacts;
  };

  const deleteTool = (name, action, deleteId) => {
    const ContactToDelete = name.filter(i => i.id !== deleteId);
    dispatch(action(ContactToDelete));
  };

  const deleteContact = e => {
    const deleteC = e.currentTarget.parentNode.attributes.id.value;
    if (filter) {
      deleteTool(filter, filterContactAction, deleteC);
    }
    deleteTool(contacts, addContactAction, deleteC);
    // setContacts(prevState => prevState.filter(c => c.id !== deleteId));
  };

  // useEffect(() => {
  //   contactsReducer(contacts)
  //   // window.localStorage.setItem('contact', JSON.stringify(contacts));
  // }, [contacts]);

  // const filterContactsList = filterContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Filter
        // filter={filter}
        onChange={filterContacts}
      />
      <Contacts
        inputRef={inputRef.current}
        filter={filter}
        contacts={contacts}
        // contactsList={filterContactsList}
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
