import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getJobs = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
