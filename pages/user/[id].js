// pages/user/[id].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Card, Button } from 'react-bootstrap';
import { getUserByUid } from '../../api/users'; // Make sure this function exists to fetch the user data from the backend.

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get the user UID from the URL

  useEffect(() => {
    if (id) {
      setLoading(true);
      getUserByUid(id) // Fetch user data based on UID from API
        .then((data) => {
          setUser(data); // Set user data
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message); // Handle errors
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {user ? (
        <Card>
          <Card.Body>
            <Card.Title>{user.userName || 'No username available'}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.uid}</Card.Subtitle>
            <Card.Text>
              <strong>Bio:</strong> {user.bio || 'No bio available'} <br />
              <strong>Rating:</strong> {user.rating || 'No rating'} <br />
            </Card.Text>
            <Button variant="secondary" onClick={() => router.push('/profile')}>
              Go Back
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}
