import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

function JobCard({ job, onDelete }) {
  const router = useRouter();

  const handleViewJob = () => {
    router.push(`/jobs/${job.id}`);
  };

  const handleEditJob = () => {
    router.push(`/jobs/edit/${job.id}`);
  };

  const handleDeleteJob = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete(job.id);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Posted by: {job.user?.userName || 'Unknown'}
        </Card.Subtitle>
        <Card.Text>{job.description}</Card.Text>
        <Button variant="primary" onClick={handleViewJob}>
          View Details
        </Button>
        <Button variant="warning" onClick={handleEditJob} className="mx-2">
          Edit
        </Button>
        <Button variant="danger" onClick={handleDeleteJob}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    user: PropTypes.shape({
      userName: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobCard;
