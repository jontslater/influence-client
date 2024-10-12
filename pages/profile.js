import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid } from '../api/users';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getUser = () => {
    getUserByUid(user?.uid).then(setUserDetails);
    console.log(user);
  };

  useEffect(() => {
    if (user?.uid) {
      getUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.uid]);

  const handleEditUserClick = () => {
    router.push(`/user/edit/${userDetails?.id}`);
  };

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Img
            variant="top"
            src={user?.fbUser?.photoURL}
            className="rounded-circle mb-3"
            style={{ width: '100px', height: '100px' }}
          />

          <Card.Title>{userDetails.userName || 'User Name'}</Card.Title>
          <Card.Text>
            {userDetails.bio || 'This is the user bio. Edit to add more details about yourself.'}
          </Card.Text>
          <Button variant="primary" onClick={handleEditUserClick}>
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
