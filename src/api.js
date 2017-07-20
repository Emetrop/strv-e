const APIKey = process.env.REACT_APP_API_KEY;
const urls = {
  login: 'https://testproject-api-v2.strv.com/auth/native',
  events: 'https://testproject-api-v2.strv.com/events',
  signUp: 'https://testproject-api-v2.strv.com/users',
};

const getLoginData = (payload) => {
  const email = payload.email;
  const password = payload.password;

  const data = {
    email,
    password,
  };

  return {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      APIKey,
    },
  };
};

export const logIn = (payload) => {
  const fetchData = getLoginData(payload);

  return fetch(urls.login, fetchData)
    .then(response => response.json())
    .then(response => response);
};

export const getAuthToken = (payload) => {
  const fetchData = getLoginData(payload);

  return fetch(urls.login, fetchData)
    .then(response => response.headers.get('Authorization'));
};

export const getEvents = () => {
  const fetchData = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      APIKey,
    },
  };

  return fetch(urls.events, fetchData)
    .then(response => response.json())
    .then(response => response);
};

export const signUp = (payload) => {
  const firstName = payload.firstName;
  const lastName = payload.lastName;
  const email = payload.email;
  const password = payload.password;

  const data = {
    firstName,
    lastName,
    email,
    password,
  };

  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      APIKey,
    },
  };

  return fetch(urls.signUp, fetchData)
    .then(response => response.json())
    .then(response => response);
};

export const createEvent = (payload, authToken) => {
  const { title, description, startsAt, capacity } = payload;

  const data = {
    title,
    description,
    startsAt,
    capacity,
  };

  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      APIKey,
      Authorization: authToken,
    },
  };

  return fetch(urls.events, fetchData)
    .then(response => response.json())
    .then(response => response);
};

export const updateEvent = (payload, authToken) => {
  const { title, description, startsAt, capacity, id } = payload;

  const data = {
    title,
    description,
    startsAt,
    capacity,
  };

  const fetchData = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      APIKey,
      Authorization: authToken,
    },
  };

  return fetch(`${urls.events}/${id}`, fetchData)
    .then(response => response.json())
    .then(response => response);
};

export const joinEvent = (id, authToken) => {
  const fetchData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      APIKey,
      Authorization: authToken,
    },
  };

  return fetch(`${urls.events}/${id}/attendees/me`, fetchData)
    .then(response => response.json())
    .then(response => response);
};

export const leaveEvent = (id, authToken) => {
  const fetchData = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      APIKey,
      Authorization: authToken,
    },
  };

  return fetch(`${urls.events}/${id}/attendees/me`, fetchData)
    .then(response => response.json())
    .then(response => response);
};
