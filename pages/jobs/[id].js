/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { getSingleJob } from '../../api/job'; // Import the job details API call
import { useAuth } from '../../utils/context/authContext';

export default function ViewJob() {
  const [jobDetails, setJobDetails] = useState({});
  const [isApplied, setIsApplied] = useState(false); // State to track if the user has applied
  const router = useRouter();
  const { user } = useAuth(); // Get the current user from context

  const { id } = router.query; // Get the job ID from the URL

  // Fetch job details once the ID is available
  useEffect(() => {
    if (id) {
      getSingleJob(id).then(setJobDetails); // Fetch the job details by ID
    }
  }, [id]);

  // Check if the current user is the job poster
  const isCurrentUserPoster = user?.uid === jobDetails.client_id?.uid;

  // Fetch applications and check if the current user has applied
  useEffect(() => {
    if (id) {
      getSingleJob(id).then((job) => {
        setJobDetails(job);
        setIsApplied(job.hasApplied); // Directly check hasApplied field
      });
    }
  }, [id]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        className="card"
        style={{
          width: '60rem',
          margin: '10px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Left section: Job Description */}
        <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
          <h5>Job Description</h5>
          <p>{jobDetails.description || 'No description available.'}</p>
        </div>

        {/* Right section: Job Details */}
        <div style={{ flex: 1, padding: '20px' }}>
          <img
            src={jobDetails.companyLogo}
            alt={jobDetails.companyName}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              marginBottom: '20px',
            }}
          />
          <h5 className="card-title">Client Rating: {jobDetails.client_id?.rating}/5</h5>
          <h6 className="card-title">Date Posted: {new Date(jobDetails.created_on).toLocaleDateString()}</h6>
          <h6 className="card-title">Pay: ${jobDetails.pay}</h6>
          <h6 className="card-title">Client: {jobDetails.client_id?.userName}</h6>
          <h6 className="card-title">Accepted: {jobDetails.accepted ? 'Yes' : 'No'}</h6>

          {/* Buttons for Edit and Apply */}
          <div className="d-flex gap-2" style={{ marginTop: '10px' }}>
            {/* Show Edit button only if the current user is the job poster */}
            {isCurrentUserPoster && (
              <Link href={`/jobs/edit/${jobDetails.id}`} passHref>
                <Button variant="warning" className="btn action-button">
                  EDIT
                </Button>
              </Link>
            )}

            {/* Show Apply button only if the current user is NOT the job poster */}
            {!isCurrentUserPoster && !isApplied && (
              <Link href={`/jobs/apply/${jobDetails.id}`} passHref>
                <Button variant="success" className="btn action-button">
                  Apply
                </Button>
              </Link>
            )}

            {/* Show "Applied" if the user has already applied */}
            {!isCurrentUserPoster && isApplied && (
              <Button variant="secondary" className="btn action-button" disabled>
                Applied
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

// Prop validation for the poster prop and its client_id
ViewJob.propTypes = {
  poster: PropTypes.shape({
    client_id: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      rating: PropTypes.number,
      userName: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
