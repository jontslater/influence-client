import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  return (
    <div>
      <h1>Welcome {user.fbUser.displayName} </h1>
    </div>
  );
}

export default Home;
