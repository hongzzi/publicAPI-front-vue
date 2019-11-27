import axios from 'axios';

export default axios.create({
  baseURL: 'http://70.12.108.47:8197',
  headers: {
    'Content-type': 'application/json'
  }
});
