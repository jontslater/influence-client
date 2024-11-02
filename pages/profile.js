import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Card, Button, ListGroup,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid } from '../api/users';
import { getJobsByUserId } from '../api/job'; // Import the function to get jobs by user ID

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [jobs, setJobs] = useState([]); // State to hold the jobs
  const router = useRouter();
  const { user } = useAuth();

  const getUser = () => {
    getUserByUid(user?.uid).then(setUserDetails);
  };

  useEffect(() => {
    if (user?.uid) {
      getUser();
      getJobsByUserId(user.uid).then(setJobs);
    }
  }, [user?.uid]);

  const handleEditUserClick = () => {
    router.push(`/user/edit/${userDetails?.id}`);
  };

  const handleNewJobClick = () => {
    router.push('/jobs/new');
  };

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Img
            variant="top"
            src={user?.fbUser?.photoURL}
            className="rounded-circle mb-3"
            style={{ width: '100px', height: '100px' }}
          />
          <Card.Title>{userDetails.userName || 'User Name'}</Card.Title>
          <Card.Text>
            {userDetails.bio || 'This is the user bio. Edit to add more details about yourself.'}
          </Card.Text>
          <Button variant="primary" onClick={handleEditUserClick}>
            Edit Profile
          </Button>
          <Button variant="primary" onClick={handleNewJobClick}>
            Create A Job
          </Button>
        </Card.Body>
      </Card>

      {/* Display the jobs section */}
      <Container className="mt-4">
        <h3>Jobs Posted by {userDetails.userName || 'User'}</h3>
        {jobs.length > 0 ? (
          <ListGroup>
            {jobs.map((job) => (
              <ListGroup.Item key={job.id}>
                <strong>{job.title}</strong> - {job.description}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No jobs available for this user.</p>
        )}
      </Container>
    </Container>
  );
}
