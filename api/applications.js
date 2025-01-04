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

// Get all applications (to check if the user has applied for a job)
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

// Get a single application for a specific job and user
const getSingleApplication = (jobId, userId) => fetch(`${endpoint}/applications?job_id=${jobId}&user_id=${userId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching application:', error);
    throw error;
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
const deleteApplication = (id) => fetch(`${endpoint}/applications/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error deleting application:', error);
    throw error;
  });

const getApplicationsByJobId = (jobId) => fetch(`${endpoint}/applications?job_id=${jobId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch applications for jobId: ${jobId}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error fetching applications:', error);
    throw error;
  });

export {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
  getApplicationsByJobId,
};
