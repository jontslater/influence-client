import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SocialsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    bluesky: '',
    tiktok: '',
    twitter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="facebook">Facebook:</label>
        <input
          type="url"
          id="facebook"
          name="facebook"
          value={formData.facebook}
          onChange={handleChange}
          placeholder="https://facebook.com/username"
        />
      </div>
      <div>
        <label htmlFor="instagram">Instagram:</label>
        <input
          type="url"
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          placeholder="https://instagram.com/username"
        />
      </div>
      <div>
        <label htmlFor="bluesky">Bluesky:</label>
        <input
          type="url"
          id="bluesky"
          name="bluesky"
          value={formData.bluesky}
          onChange={handleChange}
          placeholder="https://bluesky.social/username"
        />
      </div>
      <div>
        <label htmlFor="tiktok">TikTok:</label>
        <input
          type="url"
          id="tiktok"
          name="tiktok"
          value={formData.tiktok}
          onChange={handleChange}
          placeholder="https://tiktok.com/@username"
        />
      </div>
      <div>
        <label htmlFor="twitter">Twitter:</label>
        <input
          type="url"
          id="twitter"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="https://twitter.com/username"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

SocialsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SocialsForm;
