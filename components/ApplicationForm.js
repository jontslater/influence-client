import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { createApplication } from '../api/applications'; // API function to handle POST
import { getSingleJob } from '../api/job'; // API function to fetch job details
import { useAuth } from '../utils/context/authContext'; // Auth context to get the logged-in user

export default function ApplicationForm() {
  const router = useRouter();
  const { id } = router.query; // Job ID from the URL
  const { user } = useAuth(); // Get the authenticated user

  const [jobDetails, setJobDetails] = useState(null); // Job details state
  const [applicationData, setApplicationData] = useState({
    message: '', // Message or cover letter from the applicant
  });

  // Fetch job details based on job ID
  useEffect(() => {
    if (id) {
      getSingleJob(id)
        .then((data) => setJobDetails(data))
        .catch((error) => console.error('Error fetching job:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create application payload
    const applicationPayload = {
      message: applicationData.message,
      applicant_id: user.id, // Authenticated user's ID
      job_id: id, // Job ID from the URL
    };

    console.log(applicationPayload); // Add this line to check the payload before sending

    // Submit the application
    createApplication(applicationPayload)
      .then(() => {
        alert('Application submitted successfully!');
        router.push(`/jobs/${id}`); // Redirect to job detail page
      })
      .catch((error) => {
        console.error('Error submitting application:', error.response ? error.response.data : error);
        alert('Failed to submit application.');
      });
  };

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Apply for Job</h2>
      <p><strong>Job:</strong> {jobDetails.description}</p>
      <p><strong>Pay:</strong> ${jobDetails.pay}</p>

      <Form onSubmit={handleSubmit}>
        {/* Message / Cover Letter */}
        <Form.Group controlId="applicationMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={applicationData.message}
            onChange={handleChange}
            placeholder="Write a message to the job poster"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit Application
        </Button>
      </Form>
    </div>
  );
}
