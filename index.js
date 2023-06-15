const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action, <type>', 'choose action')
  .option('-i, --id, <type>', 'user id')
  .option('-n, --name, <type>', 'user name')
  .option('-e, --email, <type>', 'user email')
  .option('-p, --phone, <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const allContacts = await listContacts();
        return console.log(console.table(allContacts));
      } catch (error) {
        console.log(error);
      }
    case 'get':
      try {
        const contact = await getContactById(id);
        return console.log(console.table(contact));
      } catch (error) {
        console.log(error);
      }
    case 'add':
      try {
        const newContact = await addContact(name, email, phone);
        return console.log(console.table(newContact));
      } catch (error) {
        console.log(error);
      }
    case 'remove':
      try {
        const removedContact = await removeContact(id);
        return console.log(console.table(removedContact));
      } catch (error) {
        console.log(error);
      }
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
