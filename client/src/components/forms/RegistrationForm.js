import React, { useState } from 'react';
import { validateForm, areAllFieldsFilled } from '../utils/validation';

const RegistrationForm = ({ setSuccessful }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Show success toast
          setSuccessful(true);

          // Reset the form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            city: '',
            postalCode: ''
          });
          setErrors({});
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData);
          setErrors({ apiError: errorData.message || 'An error occurred while saving the data.' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ apiError: 'Failed to connect to the server.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid = areAllFieldsFilled(formData);

  return (
      <form onSubmit={handleSubmit} className="registration-form" data-testid="registration-form">
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              data-testid="input-firstName"
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom</label>
          <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
              data-testid="input-lastName"
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              data-testid="input-email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Date de naissance</label>
          <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={errors.birthDate ? 'error' : ''}
              data-testid="input-birthDate"
          />
          {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
              data-testid="input-city"
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Code postal</label>
          <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={errors.postalCode ? 'error' : ''}
              data-testid="input-postalCode"
          />
          {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
        </div>

        {errors.apiError && <span className="error-message">{errors.apiError}</span>}

        <button type="submit" disabled={!isFormValid}>
          Sauvegarder
        </button>
      </form>
  );
};

export default RegistrationForm;