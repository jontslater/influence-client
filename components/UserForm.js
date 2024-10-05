import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { getSingleUser, updateUser } from '../api/users'; // Import API methods

export default function UserForm() {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    bio: '',
    client: false,
  });

  const router = useRouter();
  const { id } = router.query;

  // Fetch user details by id
  useEffect(() => {
    if (id) {
      getSingleUser(id).then((data) => {
        setUserDetails({
          userName: data.userName || '',
          bio: data.bio || '',
          client: data.client || false,
        });
      });
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated data to API
    updateUser(id, userDetails)
      .then(() => {
        alert('User updated successfully!');
        router.push('/profile'); // Redirect to profile page or another route
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Form.Group controlId="formUserName" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={userDetails.userName}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </Form.Group>

      <Form.Group controlId="formBio" className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          value={userDetails.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Enter your bio"
          required
        />
      </Form.Group>

      <Form.Group controlId="formClient" className="mb-3">
        <Form.Check
          type="checkbox"
          name="client"
          checked={userDetails.client}
          onChange={handleChange}
          label="Are you a client?"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Profile
      </Button>
    </Form>
  );
}
