import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createApplication } from '../api/applications'; // Import API call

const ApplicationForm = ({ jobId, posterId, applicantId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const applicationPayload = {
        job: jobId,
        poster: posterId,
        applicant: applicantId,
      };

      await createApplication(applicationPayload);
      console.log(applicationPayload);

      setSuccess(true);
    } catch (err) {
      setError('Failed to apply for the job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success ? (
        <p style={{ color: 'green' }}>You successfully applied for the job!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>
            By applying for this job, your application will be sent to the
            poster for review.
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Apply Now'}
          </button>
        </form>
      )}
    </div>
  );
};

ApplicationForm.propTypes = {
  jobId: PropTypes.number.isRequired,
  posterId: PropTypes.number.isRequired,
  applicantId: PropTypes.number.isRequired,
};

export default ApplicationForm;
