import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileList = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          setProfile(response.data);
        } else {
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        } else {
          setError(error.response?.data?.message || 'An error occurred');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      await axios.delete('http://localhost:3001/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setProfile(null);
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="header">Profile Details</div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {profile ? (
        <div className="profile-card">
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Country:</strong> {profile.country}</p>
          <p><strong>State:</strong> {profile.state}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Pincode:</strong> {profile.pincode}</p>
          <p><strong>Height:</strong> {profile.height} cm</p>
          <p><strong>Weight:</strong> {profile.weight} kg</p>
          <button
            onClick={() => navigate(`/profile/edit/${profile._id}`)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="delete-button"
            style={{ marginLeft: '10px' }} // Add margin-left to create space between buttons
          >
            Delete Details
          </button>
        </div>
      ) : (
        <p>No profile found. Please fill out your profile information.</p>
      )}
    </div>
  );
};

export default ProfileList;