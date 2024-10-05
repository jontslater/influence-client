import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllJobs = () => fetch(`${endpoint}/users`, {
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

const createJob = (payload) => fetch(`${endpoint}/users`, {
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

const updateJob = (id, payload) => fetch(`${endpoint}/users/${id}`, {
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

const getSingleJob = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleJob = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllJobs, createJob, updateJob, getSingleJob, deleteSingleJob,
};
