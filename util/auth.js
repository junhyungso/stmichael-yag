import axios from 'axios';

const API_KEY = 'AIzaSyAPJhFzqdUcyabIBnOFcZFM2B1G9kFKpKI';
const BACKEND_URL = 'https://stmichael-yag-default-rtdb.firebaseio.com/';

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
    'https://stmichael-yag-default-rtdb.firebaseio.com/birthday.json',
    birthdayData
  );
  console.log(response);
  return response.data.name;
};
