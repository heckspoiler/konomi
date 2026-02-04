'use client';

import React, { useState } from 'react';

import cssStyles from './NewsletterForm.module.css';

import Arrow from '../../arrow/Arrow';

export default function NewsletterForm({
  stylesprops,
  arrowFill,
}: {
  stylesprops?: Record<string, string>;
  arrowFill?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    consent: false,
  });

  const styles = stylesprops || cssStyles;

  console.log(error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/rapidmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSuccess(true);

      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        consent: false,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to subscribe');
      console.error('Newsletter signup failed:', error);
      console.log(error);
    }
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
      <h2>
        {!isSuccess
          ? 'MELDE DICH FÜR UNSEREN NEWSLETTER AN!'
          : 'GROSSARTIG, DU BIST ANGEMELDET!'}
      </h2>

      {!isSuccess ? (
        <>
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
              Mit dem Absenden dieses Formulars stimme ich der Nutzung meiner
              Daten zu Marketingzwecken zu.
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>ANMELDEN</span>
            </button>
          </div>
        </>
      ) : (
        <div className={styles.successContainer}>
          <p>
            Du hast dich erfolgreich für unseren Newsletter angemeldet und wir
            werden dich weiterhin auf dem Laufenden behalten!
          </p>
        </div>
      )}
    </form>
  );
}
