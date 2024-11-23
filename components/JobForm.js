import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { createJob, getSingleJob, updateJob } from '../api/job'; // Import your API functions
import { useAuth } from '../utils/context/authContext';
import { getAllUsers } from '../api/users';

export default function JobForm() {
  const router = useRouter();
  const { id } = router.query; // If there's an ID, it means we're editing an existing job
  const { user } = useAuth(); // Assuming useAuth provides the authenticated user details
  const [jobData, setJobData] = useState({
    description: '',
    pay: '',
    accepted: false,
    acceptedBy: '', // Initially empty for new job
    complete: false,
  });

  const [users, setUsers] = useState([]); // State to hold the list of users

  // Fetch users to populate dropdown
  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data); // Set users data from the API response
    });
  }, []);

  // Fetch the existing job details if editing
  useEffect(() => {
    if (id) {
      getSingleJob(id).then((data) => {
        setJobData({
          description: data.description,
          pay: data.pay,
          accepted: data.accepted,
          acceptedBy: data.acceptedBy.id, // Store the user ID
          complete: data.complete,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setJobData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobDetails = {
      ...jobData,
      client_id: user.id, // Automatically assign client_id based on authenticated user
    };

    console.log('Job Details:', jobDetails); // Log job details for debugging

    if (id) {
      // If editing, update the job
      updateJob(id, jobDetails)
        .then(() => router.push(`/jobs/${id}`)) // Redirect to job detail page after update
        .catch((error) => console.error('Error updating job:', error)); // Log any error
    } else {
      // If creating, call createJob API
      createJob(jobDetails)
        .then(() => router.push('/profile')) // Redirect to job list page after creation
        .catch((error) => console.error('Error creating job:', error)); // Log any error
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Edit Job' : 'Create Job'}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Description */}
        <Form.Group controlId="jobDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Pay */}
        <Form.Group controlId="pay">
          <Form.Label>Pay</Form.Label>
          <Form.Control
            type="text"
            name="pay"
            value={jobData.pay}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Show AcceptedBy only if we're editing */}

        <Form.Group controlId="acceptedBy">
          <Form.Label>Accepted By</Form.Label>
          <Form.Control
            as="select"
            name="acceptedBy"
            value={jobData.acceptedBy}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.userName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Complete */}
        <Form.Group controlId="complete">
          <Form.Check
            type="checkbox"
            label="Complete"
            name="complete"
            checked={jobData.complete}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Accepted */}
        <Form.Group controlId="accepted">
          <Form.Check
            type="checkbox"
            label="Accepted"
            name="accepted"
            checked={jobData.accepted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {id ? 'Update Job' : 'Create Job'}
        </Button>
      </Form>
    </div>
  );
}
