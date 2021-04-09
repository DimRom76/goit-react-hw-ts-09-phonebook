import { ITodo } from './contacts-reducer';
import { createAction } from '@reduxjs/toolkit';

export const fetchContactsRequest = createAction(
  'contacts/fetchContactsRequest',
);
export const fetchContactsSuccess = createAction<ITodo[]>(
  'contacts/fetchContactsSuccess',
);
export const fetchContactsError = createAction<string>(
  'contacts/fetchContactsError',
);

export const addContactRequest = createAction('contacts/addContactRequest');
export const addContactSuccess = createAction<ITodo>(
  'contacts/addContactSuccess',
);
export const addContactError = createAction<string>('contacts/addContactError');

export const editContactRequest = createAction('contacts/editContactRequest');
export const editContactSuccess = createAction<ITodo>(
  'contacts/editContactSuccess',
);
export const editContactError = createAction<string>(
  'contacts/editContactError',
);

export const deleteContactRequest = createAction(
  'contacts/deleteContactRequest',
);
export const deleteContactSuccess = createAction<string>(
  'contacts/deleteContactSuccess',
);
export const deleteContactError = createAction<string>(
  'contacts/deleteContactError',
);

export const changeFilter = createAction('contacts/changeFilter');
