import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContactAction(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContactAction(state, action) {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
    },
    filterContactAction: (state, action) => {
      state.contacts = state.contacts.filter(({ name }) =>
        name.toLowerCase().includes(action.payload)
      );
    },
  },
});

const persistConfig = {
  key: 'contact',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const { addContactAction, deleteContactAction, filterContactAction } = contactSlice.actions;
// // Редюсер слайсу
// const stateReducer = stateSlice.reducer;
// console.log(addContact);

// Selectors
export const getContact = store => store.contacts.contacts;
export const getFilter = store => store.contacts.filter;