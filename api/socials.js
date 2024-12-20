import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Create a social
const createSocial = (payload) => fetch(`${endpoint}/socials`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating social:', error);
    throw error;
  });

// Get all socials
const getAllSocials = () => fetch(`${endpoint}/socials`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching socials:', error);
    throw error;
  });

// Get a single social
const getSingleSocial = (id) => fetch(`${endpoint}/socials/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching social:', error);
    throw error;
  });

// Update a social
const updateSocial = (id, payload) => fetch(`${endpoint}/socials/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating social:', error);
    throw error;
  });

// Delete a social
const deleteSocial = (id) => fetch(`${endpoint}/socials/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error deleting social:', error);
    throw error;
  });

export {
  createSocial,
  getAllSocials,
  getSingleSocial,
  updateSocial,
  deleteSocial,
};