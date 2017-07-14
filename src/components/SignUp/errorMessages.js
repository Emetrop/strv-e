const messages = [
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
    id: 'Path `password` is required.',
    field: 'password',
    message: 'Password has to be filled up',
  },
  {
    id: 'Path `email` is required.',
    field: 'email',
    message: 'Email has to be filled up',
  },
  {
    id: 'Path `lastName` is required.',
    field: 'lastName',
    message: 'Last name has to be filled up',
  },
  {
    id: 'Path `firstName` is required.',
    field: 'firstName',
    message: 'First name has to be filled up',
  },
];

export default messages;
