import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllJobs } from '../api/job';

function Home() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getJobs = () => {
    getAllJobs().then(setJobs);
  };

  useEffect(() => {
    getJobs();
  }, [id, jobs]);

  const handleEditUserClick = () => {
    router.push(`/jobs/edit/${jobs?.id}`);
  };

  return (
    <div>
      <h1>Welcome {user.fbUser.displayName}</h1>
      <h2>Job Listings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <p>Date Created: {new Date(job.created_on).toLocaleDateString()}</p>
            <p>Complete: {job.complete ? 'Yes' : 'No'}</p>
            <p>Pay: ${job.pay}</p>
            <p>Client: {job.client_id.userName}</p>
            <p>Description: {job.description}</p>
            <Button variant="primary" onClick={handleEditUserClick}>View Details</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
