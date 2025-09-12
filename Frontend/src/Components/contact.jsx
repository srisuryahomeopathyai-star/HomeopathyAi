/** @format */

import React, { useState } from "react";
import "./ContactUs.css"; // Import the CSS file

const ContactUs = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccess(true);
      form.reset();
    }
  };

  return (
    <div className='contact-container'>
      <h2 className='contact-title'>Contact Us</h2>

      {success && (
        <div className='success-message'>
          ✅ Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className='contact-form'>
        <input
          type='hidden'
          name='access_key'
          value='3959e4be-5259-4f5b-9e69-0787c602fc4f'
        />

        <div className='form-group'>
          <label>Your Name</label>
          <input type='text' name='name' required />
        </div>

        <div className='form-group'>
          <label>Email Address</label>
          <input type='email' name='email' required />
        </div>

        <div className='form-group'>
          <label>Your Message</label>
          <textarea name='message' rows='5' required></textarea>
        </div>

        <button type='submit' className='submit-button'>
          ✉️ Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
