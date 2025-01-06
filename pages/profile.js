import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Card, Button, ListGroup,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid } from '../api/users';
import { getJobsByUserId } from '../api/job';
import { createSocial, updateSocial } from '../api/socials';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [jobs, setJobs] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    id: null, // Store the social ID
    facebook: '',
    instagram: '',
    bluesky: '',
    tiktok: '',
    twitter: '',
  });
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const jobsPerPage = 5;
  const router = useRouter();
  const { user } = useAuth();

  const getUserAndJobs = () => {
    getUserByUid(user?.uid).then((userData) => {
      setUserDetails(userData);

      // Fetch and set the social links
      const socials = userData?.social?.[0] || {
        id: null,
        facebook: '',
        instagram: '',
        bluesky: '',
        tiktok: '',
        twitter: '',
      };
      setSocialLinks(socials);

      if (userData?.id) {
        getJobsByUserId(userData.id).then(setJobs);
      }
    });
  };

  useEffect(() => {
    if (user?.uid) {
      getUserAndJobs();
    }
  }, [user?.uid]);

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

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();

    // Log the socialLinks object to inspect what is being sent
    console.log('Social Links being sent:', socialLinks);

    // Ensure user_id from userDetails is included in the socialLinks
    const socialDetails = {
      ...socialLinks,
      user_id: userDetails.id, // Add the user’s database ID to social details
    };

    if (socialLinks.id) {
      // If socialLinks.id exists, update the existing record
      updateSocial(socialDetails.id, socialDetails)
        .then(() => {
          alert('Social links updated successfully!');
        })
        .catch((error) => console.error('Error updating social links:', error));
    } else {
      // If no id exists, create a new social record
      createSocial(socialDetails)
        .then(() => {
          alert('Social links created successfully!');
          // Optionally, redirect to profile page or clear the form
        })
        .catch((error) => console.error('Error creating social links:', error));
    }
  };

  const displayedJobs = jobs.slice(currentJobIndex, currentJobIndex + jobsPerPage);

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
                  <Link href={`/applications/${job.id}`} passHref>
                    <Button variant="info" className="action-button" aria-label={`View job ${job.title}`}>
                      VIEW APPLICATIONS
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

        {/* Social Links Section */}
        <Card style={{ flex: '0 0 300px', padding: '20px' }}>
          <h3>Social Links</h3>
          <form onSubmit={handleSocialSubmit}>
            {Object.keys(socialLinks).filter((key) => key !== 'id').map((key) => (
              <div key={key} className="mb-3">
                <label htmlFor={key} className="form-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="url"
                  className="form-control"
                  id={key}
                  name={key}
                  value={socialLinks[key]}
                  onChange={handleSocialChange}
                />
              </div>
            ))}
            <Button type="submit" variant="primary">
              Update Social Links
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
