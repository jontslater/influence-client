import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Create an application
const createApplication = (payload) => fetch(`${endpoint}/applications`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating application:', error);
    throw error;
  });

// Get all applications
const getAllApplications = () => fetch(`${endpoint}/applications`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching applications:', error);
    throw error;
  });

// Get a single application
const getSingleApplication = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/applications/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// Update an application
const updateApplication = (id, payload) => fetch(`${endpoint}/applications/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating application:', error);
    throw error;
  });

// Delete an application
const deleteApplication = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/applications/${id}`, {
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
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
};
