import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const signup = (data) => API.post('/user/signup', data);
export const signin = (data) => API.post('/user/signin', data);
export const getFamilyDetails = () => API.get('/family/details');
export const getMemberSpending = () => API.get('/family/members-spending');
export const getTransactions = () => API.get('/transaction/list');
export const addFamilyMember = (data) => API.post('/family/add-member', data);
export const addTransaction = (data) => API.post('/transaction/add', data);

export default API;
