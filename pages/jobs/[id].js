/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleJob } from '../../api/job';

export default function ViewJob() {
  const [jobDetails, setJobDetails] = useState({});
  const router = useRouter();

  const { id } = router.query; // Get the job ID from the URL

  useEffect(() => {
    if (id) {
      getSingleJob(id).then(setJobDetails); // Fetch job details using the job ID
    }
  }, [id]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <Card
        className="card"
        style={{
          width: '60rem', margin: '10px', display: 'flex', flexDirection: 'row',
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
              width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px',
            }}
          />
          <h5 className="card-title">Client Rating: {jobDetails.client_id?.rating}/5</h5>
          <h6 className="card-title">Date Posted: {new Date(jobDetails.created_on).toLocaleDateString()}</h6>
          <h6 className="card-title">Pay: ${jobDetails.pay}</h6>
          <h6 className="card-title">Client: {jobDetails.client_id?.userName}</h6>
          <h6 className="card-title">Accepted: {jobDetails.accepted ? 'Yes' : 'No'}</h6>

          {/* Buttons for Edit and Apply */}
          <div className="d-flex gap-2" style={{ marginTop: '10px' }}>
            <Link href={`/jobs/edit/${jobDetails.id}`} passHref>
              <Button variant="warning" className="btn action-button">EDIT</Button>
            </Link>
            <Link href={`/jobs/apply/${jobDetails.id}`} passHref>
              <Button variant="success" className="btn action-button">Apply</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
