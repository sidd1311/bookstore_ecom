import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { AuthContext } from '../AuthContext';
import fetchUser from './fetchuser';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Alert, Card, Button } from 'react-bootstrap';

const UpdateProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [editingField, setEditingField] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      
      fetchUserProfile(userId);
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async (userId) => {
    try {
      const userProfile = await fetchUser(userId);
      setUser(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleSave = async (fieldName, newValue) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      console.log(`Updating user ${userId} - Field: ${fieldName}, New Value: ${newValue}`);
      
      const response = await axios.put(`http://localhost:5000/updateuser/${userId}`, { [fieldName]: newValue });
      console.log('Server response:', response.data);
      
      setUser({ ...user, [fieldName]: newValue });
      setEditingField('');
      setAlertMessage(`Successfully updated ${fieldName}`);
      setAlertVariant('success');
    } catch (error) {
      console.error('Error updating user profile:', error.response ? error.response.data : error.message);
      setAlertMessage('Failed to update profile');
      setAlertVariant('danger');
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <h1 className="text-center">Update Profile</h1>
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>First Name</Card.Title>
              {editingField === 'firstName' ? (
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={user.firstName || ''}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                  <Button variant="outline-secondary" onClick={() => handleSave('firstName', user.firstName)}>Save</Button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between">
                  <span>{user.firstName}</span>
                  <Button variant="link" onClick={() => handleEdit('firstName')}>
                    <i className="fas fa-pencil-alt"></i>
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Last Name</Card.Title>
              {editingField === 'lastName' ? (
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={user.lastName || ''}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  />
                  <Button variant="outline-secondary" onClick={() => handleSave('lastName', user.lastName)}>Save</Button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between">
                  <span>{user.lastName}</span>
                  <Button variant="link" onClick={() => handleEdit('lastName')}>
                    <i className="fas fa-pencil-alt"></i>
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Mobile</Card.Title>
              {editingField === 'mobile' ? (
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={user.mobile || ''}
                    onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                  />
                  <Button variant="outline-secondary" onClick={() => handleSave('mobile', user.mobile)}>Save</Button>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between">
                  <span>{user.mobile}</span>
                  <Button variant="link" onClick={() => handleEdit('mobile')}>
                    <i className="fas fa-pencil-alt"></i>
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
  