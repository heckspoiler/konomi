'use client';

import React, { useState } from 'react';

import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>MELDE DICH FÜR UNSEREN NEWSLETTER AN!</h2>

      <div className={styles.textInputContainer}>
        <div className={styles.emailContainer}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="メールアドレス - Mailadresse"
              required
            />
          </div>
        </div>

        <div className={styles.nameContainer}>
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="名前 - Vorname"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="苗字 - Nachname"
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.consentContainer}>
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          Mit dem Absenden dieses Formulars stimme ich der Nutzung meiner Daten
          zu Marketingzwecken zu.
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit">ANMELDEN</button>
      </div>
    </form>
  );
}
