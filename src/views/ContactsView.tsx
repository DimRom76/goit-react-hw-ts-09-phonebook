import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';

import ContactList from '../Components/ContactList';
import ContactForm from '../Components/ContactForm';
import Mainbar from '../Components/Mainbar';
import Modal from '../Components/Modal';

import { contactsOperation, contactsSelectors } from '../redux/contacts';
import { IContact } from '../redux/contacts/contacts-reducer';

function ContactsView() {
  const isContactsLoading = useSelector(contactsSelectors.getLoading);
  const dispatch = useDispatch();

  const [showModal, setshowModal] = useState(false);
  const [editContact, setEditContact] = useState({});

  useEffect(() => {
    const fetchContacts = () => dispatch(contactsOperation.fetchContacts());

    fetchContacts();
  }, [dispatch]);

  const toggleModal = () => {
    setshowModal(!showModal);
    setEditContact({});
  };

  const currentEditContact = (editContact: IContact) => {
    setshowModal(!showModal);
    setEditContact(editContact);
  };

  return (
    <div className="container">
      {isContactsLoading && (
        <Modal onClose={toggleModal}>
          <h1>Обработка данных...</h1>
        </Modal>
      )}

      <Paper className="paper">
        <Mainbar onClick={toggleModal} />

        <h2>Phonebook</h2>

        <ContactList onEditContact={currentEditContact} />
      </Paper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSave={toggleModal} editContact={editContact} />
        </Modal>
      )}
    </div>
  );
}

export default ContactsView;
