import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const ping = () => {
  axios.get<void>(`${apiBaseUrl}/ping`);
};

const fetchAll = async () => {
  const request = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return request.data;
};


const fetchById = async (id: string) => {
  const request = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    console.log("id",id);
  return request.data;
};

export default {
  ping,
  fetchAll,
  fetchById
};