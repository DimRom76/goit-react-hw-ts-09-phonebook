import { ITodo } from './contacts-reducer';
import axios from 'axios';
import { AppDispatch } from './../store';
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
} from './contacts-actions';

//axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => (dispatch: AppDispatch) => {
  dispatch(fetchContactsRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch(error => dispatch(fetchContactsError(error)));
};

const addContact = (values: ITodo) => (dispatch: AppDispatch) => {
  dispatch(addContactRequest());

  axios
    .post('/contacts', values)
    .then(({ data }) => {
      return dispatch(addContactSuccess(data));
    })
    .catch(error => dispatch(addContactError(error)));
};

const editContact = (values: ITodo) => (dispatch: AppDispatch) => {
  dispatch(editContactRequest());
  const { id } = values;
  delete values.id;

  axios
    .patch(`/contacts/${id}`, values)
    .then(({ data }) => {
      return dispatch(editContactSuccess(data));
    })
    .catch(error => dispatch(editContactError(error)));
};

const deleteContact = (contactId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch(error => dispatch(deleteContactError(error)));
};

const operationContacts = {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
};

export default operationContacts;
