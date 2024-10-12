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
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <Card
        className="card"
        style={{
          width: '60rem', margin: '10px', display: 'flex', flexDirection: 'row',
        }}
      >
        <img src={jobDetails.companyLogo} alt={jobDetails.companyName} style={{ width: '300px', height: '100%', objectFit: 'cover' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <h5 className="card-title">{jobDetails.jobTitle}</h5>
          <p className="card-text">{jobDetails.jobDescription || ''}</p>
          <h6 className="card-title">Company: {jobDetails.companyName}</h6>
          <h6 className="card-title">Location: {jobDetails.location}</h6>
          <h6 className="card-title">Pay: {jobDetails.pay}</h6>
          <h6 className="card-title">Posted by: {jobDetails.postedBy}</h6>

          {jobDetails?.applied && <span>✔️ Applied<br /></span>}
          {jobDetails?.closed && <span>❌ Closed<br /></span>}

          <Button
            variant="primary"
            style={{
              backgroundColor: 'black', color: 'white', border: '1px solid black', marginBottom: '10px',
            }}
            href={jobDetails.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-external-link-alt" style={{ color: 'white' }} /> Company Website
          </Button>

          <Link href={`/job/edit/${jobDetails.id}`} passHref>
            <Button variant="warning" className="btn action-button">EDIT</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
