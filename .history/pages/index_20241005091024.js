import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  return (
    <div>
      <h1>Welcome {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
