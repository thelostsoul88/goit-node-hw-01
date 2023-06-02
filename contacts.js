const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("colors");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath);
    const res = JSON.parse(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactsId) => {
  try {
    const data = await listContacts();
    const res = data.find((contact) => contact.id === contactsId);
    return res || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const res = data.findIndex((contact) => contact.id === contactId);
    if (res !== -1) {
      const [result] = data.splice(res, 1);
      writeFile(contactsPath, JSON.stringify(data));
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  if (data.some((contact) => contact.phone === newContact.phone)) {
    console.log("already have this contact!".red);
  } else {
    data.push(newContact);
    await writeFile(contactsPath, JSON.stringify(data));
    return newContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
