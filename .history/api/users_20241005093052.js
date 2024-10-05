import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllUsers = () => fetch(`${endpoint}/users`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching users:', error);
    throw error;
  });

const createUser = (payload) => fetch(`${endpoint}/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating user:', error);
    throw error;
  });

const updateUser = (id, payload) => fetch(`${endpoint}/users/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating user:', error);
    throw error;
  });

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllUsers, updateUser, createUser, getSingleUser,
};