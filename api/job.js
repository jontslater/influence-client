import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllJobs = () => fetch(`${endpoint}/jobs`, {
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

const createJob = (payload) => fetch(`${endpoint}/jobs`, {
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

const updateJob = (id, payload) => fetch(`${endpoint}/jobs/${id}`, {
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
  fetch(`${endpoint}/jobs/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleJob = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getJobsByUserId = (uid) => fetch(`${endpoint}/jobs?user=${uid}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching jobs by user:', error);
    throw error;
  });

export {
  getAllJobs, createJob, updateJob, getSingleJob, deleteSingleJob, getJobsByUserId,
};
