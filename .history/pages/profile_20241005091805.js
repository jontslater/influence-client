import React from 'react';
import {
  Container, Row, Col, Card, Button,
} from 'react-bootstrap';

export default function Profile() {
  <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="text-center">
          <Card.Body>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="Profile Placeholder"
              className="rounded-circle mb-3"
            />
            <Card.Title>John Doe</Card.Title>
            <Card.Text>
              Profile information
            </Card.Text>
            <Button variant="primary">Edit Profile</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>;
}
