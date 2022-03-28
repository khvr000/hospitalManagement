
import axios from 'axios';

const defaultInstance = axios.create({
    headers: {
        common: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        },
    },
    timeout: process.env.HTTP_CALL_TIMEOUT,
});

export default defaultInstance;
