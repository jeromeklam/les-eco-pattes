import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BO_URL,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
  },
});
