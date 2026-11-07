'use client';

import React, { useId, useState } from 'react';

import cssStyles from './NewsletterForm.module.css';

const EMPTY_FORM = {
  email: '',
  firstName: '',
  lastName: '',
  consent: false,
  website: '',
};

const FALLBACK_ERROR =
  'Die Anmeldung hat leider nicht geklappt. Bitte versuche es später nochmal.';

export default function NewsletterForm({
  stylesprops,
}: {
  stylesprops?: Record<string, string>;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const id = useId();

  const styles = stylesprops || cssStyles;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

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
        throw new Error(data.error || FALLBACK_ERROR);
      }

      setIsSuccess(true);

      setFormData(EMPTY_FORM);
    } catch (error) {
      setError(error instanceof Error ? error.message : FALLBACK_ERROR);
      console.error('Newsletter signup failed:', error);
    } finally {
      setIsSubmitting(false);
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
                  id={`${id}-email`}
                  aria-label="E-Mail-Adresse"
                  autoComplete="email"
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
                  id={`${id}-firstName`}
                  aria-label="Vorname"
                  autoComplete="given-name"
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
                  id={`${id}-lastName`}
                  aria-label="Nachname"
                  autoComplete="family-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="苗字 - Nachname"
                  required
                />
              </div>
            </div>
          </div>

          {/* Honeypot: invisible to people, bots fill it in. */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="visually-hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
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
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
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
