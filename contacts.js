const fs = require('fs/promises');
const { contactsPath } = require('./db');
const { nanoid } = require('nanoid');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const res = contacts.find(item => item.id === contactId.toString());
  return res || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId.toString());

  if (idx === -1) return null;
  const [res] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
