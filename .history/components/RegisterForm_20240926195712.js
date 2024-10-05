import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with the correct path to the registerUser function

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    uid: user.uid,
    name: '',
    username: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          placeholder="Enter your full name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          required
          placeholder="Enter your username"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
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
