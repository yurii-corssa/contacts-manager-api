const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);

  return JSON.parse(data);
};

const getById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);

  return result || null;
};

const addContact = async (body) => {
  const data = await listContacts();
  const item = {
    id: nanoid(),
    ...body,
  };
  data.push(item);
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return item;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return { message: "contact deleted" };
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const { id, name, email, phone } = data[index];
  const newItem = {
    id,
    name,
    email,
    phone,
    ...body,
  };
  data.splice(index, 1, newItem);
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return newItem;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
