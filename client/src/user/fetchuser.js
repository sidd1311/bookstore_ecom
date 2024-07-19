// fetchUser.js

import axios from 'axios';

const fetchUser = async (userId) => {
  try {
    const response = await axios.post(`http://localhost:5000/fetchuser/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export default fetchUser;
