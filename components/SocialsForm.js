import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';

import { useAuth } from '../utils/context/authContext';
import { createSocial, getSingleSocial, updateSocial } from '../api/socials';

export default function SocialsForm() {
  const router = useRouter();
  const { id } = router.query; // If there's an ID, it means we're editing an existing social record
  const { user } = useAuth(); // Get the authenticated user
  const [socialData, setSocialData] = useState({
    id: '',
    facebook: '',
    instagram: '',
    bluesky: '',
    tiktok: '',
    twitter: '',
  });

  // Fetch the existing social record if editing
  useEffect(() => {
    if (id) {
      getSingleSocial(id) // Fetch the social record using its social ID
        .then((data) => {
          setSocialData({
            facebook: data.facebook || '',
            instagram: data.instagram || '',
            bluesky: data.bluesky || '',
            tiktok: data.tiktok || '',
            twitter: data.twitter || '',
          });
        })
        .catch((error) => {
          console.error('Error fetching social by ID:', error);
          // Optionally handle navigation if social doesn't exist
          router.push('/profile'); // Redirect to profile or a different page
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const socialDetails = {
      ...socialData,
      user_id: user.id, // Assign the authenticated user's ID directly
    };

    // Log the social details being sent for create or update
    console.log('Social Details being sent:', socialDetails);

    if (id) {
      // Update the social record if editing
      updateSocial(id, socialDetails) // Update by social ID
        .then(() => router.push(`/socials/${id}`)) // Redirect to the social detail page
        .catch((error) => console.error('Error updating social:', error));
    } else {
      // Create a new social record if adding
      createSocial(socialDetails)
        .then(() => router.push('/profile')) // Redirect to the profile page
        .catch((error) => console.error('Error creating social:', error));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Edit Social Links' : 'Add Social Links'}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Facebook */}
        <Form.Group controlId="facebook">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            type="url"
            name="facebook"
            value={socialData.facebook}
            onChange={handleChange}
            placeholder="https://facebook.com/yourprofile"
          />
        </Form.Group>

        {/* Instagram */}
        <Form.Group controlId="instagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            type="url"
            name="instagram"
            value={socialData.instagram}
            onChange={handleChange}
            placeholder="https://instagram.com/yourprofile"
          />
        </Form.Group>

        {/* Bluesky */}
        <Form.Group controlId="bluesky">
          <Form.Label>Bluesky</Form.Label>
          <Form.Control
            type="url"
            name="bluesky"
            value={socialData.bluesky}
            onChange={handleChange}
            placeholder="https://bsky.app/yourprofile"
          />
        </Form.Group>

        {/* TikTok */}
        <Form.Group controlId="tiktok">
          <Form.Label>TikTok</Form.Label>
          <Form.Control
            type="url"
            name="tiktok"
            value={socialData.tiktok}
            onChange={handleChange}
            placeholder="https://tiktok.com/@yourprofile"
          />
        </Form.Group>

        {/* Twitter */}
        <Form.Group controlId="twitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            type="url"
            name="twitter"
            value={socialData.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/yourprofile"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {id ? 'Update Social Links' : 'Add Social Links'}
        </Button>
      </Form>
    </div>
  );
}
