import axios from 'axios';

// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const instance = axios.create({
  baseURL: location.origin + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
