import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  changeFilter,
} from './contacts-actions';

export interface IContact {
  id?: string;
  name: string;
  number: string;
}

const initialContacts: IContact[] = [];

const items = createReducer(
  initialContacts,
  builder => {
    builder
      .addCase(fetchContactsSuccess, (_, { payload }) => payload)
      .addCase(addContactSuccess, (state, { payload }) => [...state, payload])
      .addCase(deleteContactSuccess, (state, { payload }) =>
        state.filter(contact => contact.id !== payload),
      )
      .addCase(editContactSuccess, (state, { payload }) =>
        state.map(todo => (todo.id === payload.id ? payload : todo)),
      );
  },
  //   {
  //   [fetchContactsSuccess]: (_, { payload }) => payload,
  //   [addContactSuccess]: (state, { payload }) => [...state, payload],
  //   [deleteContactSuccess]: (state, { payload }) =>
  //     state.filter(contact => contact.id !== payload),
  //   [editContactSuccess]: (state, { payload }) =>
  //     state.map(todo => (todo.id === payload.id ? payload : todo)),
  // }
);

const filter = createReducer(
  '',
  builder => {
    builder.addCase(changeFilter, (_, { payload }) => payload);
  },
  // {
  //   [changeFilter]: (_, { payload }) => payload,
  // }
);

const setTrue = () => true;
const setFalse = () => false;

const loading = createReducer(
  false,
  builder => {
    builder
      .addCase(fetchContactsRequest, setTrue)
      .addCase(fetchContactsSuccess, setFalse)
      .addCase(fetchContactsError, setFalse)
      .addCase(addContactRequest, setTrue)
      .addCase(addContactSuccess, setFalse)
      .addCase(addContactError, setFalse)
      .addCase(editContactRequest, setTrue)
      .addCase(editContactSuccess, setFalse)
      .addCase(editContactError, setFalse)
      .addCase(deleteContactRequest, setTrue)
      .addCase(deleteContactSuccess, setFalse)
      .addCase(deleteContactError, setFalse);
  },
  //   {
  //   [fetchContactsRequest]: () => true,
  //   [fetchContactsSuccess]: () => false,
  //   [fetchContactsError]: () => false,
  //   [addContactRequest]: () => true,
  //   [addContactSuccess]: () => false,
  //   [addContactError]: () => false,
  //   [editContactRequest]: () => true,
  //   [editContactSuccess]: () => false,
  //   [editContactError]: () => false,
  //   [deleteContactRequest]: () => true,
  //   [deleteContactSuccess]: () => false,
  //   [deleteContactError]: () => false,
  // }
);

const error = createReducer(null, {});

const contactsReducer = combineReducers({
  items,
  filter,
  loading,
  error,
});

export default contactsReducer;
