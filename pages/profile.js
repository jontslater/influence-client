import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Card, Button, ListGroup,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid } from '../api/users';
import { getJobsByUserId } from '../api/job';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [jobs, setJobs] = useState([]); // State to hold the jobs
  const [currentJobIndex, setCurrentJobIndex] = useState(0); // Current index for job display
  const jobsPerPage = 5; // Number of jobs to display per page
  const router = useRouter();
  const { user } = useAuth();

  // Fetch user details first, then fetch jobs by user ID
  const getUserAndJobs = () => {
    getUserByUid(user?.uid).then((userData) => {
      setUserDetails(userData);
      if (userData?.id) {
        getJobsByUserId(userData.id).then(setJobs); // Use userDetails.id for fetching jobs
      }
    });
  };

  useEffect(() => {
    if (user?.uid) {
      getUserAndJobs();
    }
  }, [user.uid]);

  const handleEditUserClick = () => {
    router.push(`/user/edit/${userDetails?.id}`);
  };

  const handleNewJobClick = () => {
    router.push('/jobs/new');
  };

  const handleNextClick = () => {
    setCurrentJobIndex((prevIndex) => Math.min(prevIndex + jobsPerPage, jobs.length));
  };

  const handleBackClick = () => {
    setCurrentJobIndex((prevIndex) => Math.max(prevIndex - jobsPerPage, 0));
  };

  const displayedJobs = jobs.slice(currentJobIndex, currentJobIndex + jobsPerPage); // Get the jobs to display

  return (
    <Container className="mt-5">
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Profile Section */}
        <Card className="text-center" style={{ flex: '0 0 300px', minHeight: '400px' }}>
          <Card.Body>
            <Card.Img
              variant="top"
              src={user?.fbUser?.photoURL}
              className="rounded-circle mb-3"
              style={{ width: '100px', height: '100px' }}
            />
            <Card.Title>{userDetails.userName || 'User Name'}</Card.Title>
            <Card.Text style={{ minHeight: '50px' }}>
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

        {/* Jobs Section */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3>Jobs Posted by {userDetails.userName || 'User'}</h3>
          {jobs.length > 0 ? (
            <ListGroup>
              {displayedJobs.map((job) => (
                <ListGroup.Item key={job.id}>
                  <strong>{job.title}</strong> Created On: <strong>{new Date(job.created_on).toLocaleDateString()}</strong>
                  <br />
                  {job.description} <br /> Pay: <strong>${job.pay}</strong>
                  <br />
                  <Link href={`/jobs/${job.id}`} passHref>
                    <Button variant="info" className="action-button" aria-label={`View job ${job.title}`}>
                      VIEW
                    </Button>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No jobs available for this user.</p>
          )}

          {/* Pagination Controls */}
          <div className="mt-3">
            {currentJobIndex > 0 && (
              <Button variant="secondary" onClick={handleBackClick} className="me-2">
                Back
              </Button>
            )}
            {currentJobIndex + jobsPerPage < jobs.length && (
              <Button variant="primary" onClick={handleNextClick}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
