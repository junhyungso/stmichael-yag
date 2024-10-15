import axios from 'axios';

const API_KEY = 'AIzaSyAPJhFzqdUcyabIBnOFcZFM2B1G9kFKpKI';
const BACKEND_URL = 'https://stmichael-yag-default-rtdb.firebaseio.com/';

export const getCelebrations = async () => {
  const response = await axios.get(
    'http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today'
  );
  return response.data;
};

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
};

export const createUser = (email, password) => {
  return authenticate('signUp', email, password);
};

export const login = (email, password) => {
  return authenticate('signInWithPassword', email, password);
};

export const storeBirthday = async (birthdayData) => {
  const response = await axios.post(
    BACKEND_URL + '/birthday.json',
    birthdayData
  );
  return response.data.name;
};

export const getBirthdays = async () => {
  const response = await axios.get(BACKEND_URL + '/birthday.json');
  return response.data;
};

export const storeEvent = async (eventData) => {
  const response = await axios.post(BACKEND_URL + '/events.json', eventData);
  return response.data.name;
};

export const getEvents = async () => {
  const response = await axios.get(BACKEND_URL + '/events.json');
  return response.data;
};

export const storeForum = async (eventData) => {
  const response = await axios.post(BACKEND_URL + '/forums.json', eventData);
  return response.data.name;
};

export const getForums = async () => {
  const response = await axios.get(BACKEND_URL + '/forums.json');
  return response.data;
};
