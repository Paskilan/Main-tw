import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5298/Students/GetStudents', // Replace <port> with your Web API's port
});

export const getData = async () => {
    try {
        const response = await api.get('/your-endpoint'); // Replace with your API endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};