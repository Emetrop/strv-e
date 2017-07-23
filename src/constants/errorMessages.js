const messages = [
  {
    id: 'User.InvalidPassword',
    field: 'password',
    message: 'Password is not correct',
  },
  {
    id: 'User.Exists',
    field: 'email',
    message: 'User with this email already exists',
  },
  {
    id: 'Candidate.MissingAPIKey',
    field: 'form',
    message: 'API key has not been set up',
  },
  {
    id: 'Candidate.InvalidAPIKey',
    field: 'form',
    message: 'API key is invalid',
  },
  {
    id: 'User.NotAuthenticated',
    field: 'form',
    message: 'You are not logged in',
  },
  {
    id: 'Auth.InvalidToken',
    field: 'form',
    message: 'Authorization token is expired',
  },
];

export default messages;
