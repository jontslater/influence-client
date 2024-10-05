import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with correct path

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    bio: '',
    userName: '',
    client: false,
    uid: user.uid, // Assuming uid is passed from the user object
  });

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="userName" required placeholder="Enter your username" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClient">
        <Form.Check type="checkbox" label="Are you a client?" name="client" onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
