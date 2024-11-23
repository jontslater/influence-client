import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  }, [id]);

  return (
    <div style={{
      maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}
    >
      <h1 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333' }}>Welcome {user.fbUser.displayName}</h1>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#007bff' }}>Job Listings</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              flex: '1 1 calc(50% - 20px)', backgroundColor: '#fff', borderRadius: '6px', padding: '15px', border: '1px solid #e1e1e1', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={{ margin: '5px 0', color: '#555' }}>Date Created: {new Date(job.created_on).toLocaleDateString()}</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Complete: {job.complete ? 'Yes' : 'No'}</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Pay: ${job.pay}</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Client: {job.client_id.userName}</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Client Rating: {job.client_id.rating}/5</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Description: {job.description}</p>
            <Link href={`/jobs/${job.id}`} passHref>
              <Button variant="info" style={{ marginTop: '10px' }}>VIEW</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
