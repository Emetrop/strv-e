const messages = [
  {
    id: 'User.NotAuthenticated',
    field: 'form',
    message: 'User is not logged in',
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
    id: 'Auth.InvalidToken',
    field: 'form',
    message: 'Authorization token is expired',
  },
  {
    id: '"title" is not allowed to be empty',
    field: 'title',
    message: 'Title has to be filled up',
  },
  {
    id: '"description" is not allowed to be empty',
    field: 'description',
    message: 'Description has to be filled up',
  },
  {
    id: '"capacity" is not allowed to be empty',
    field: 'capacity',
    message: 'Capacity has to be filled up',
  },
  {
    id: '"startsAt" must be a valid ISO 8601 date',
    field: 'startsAt',
    message: 'This is not valid format',
  },
  {
    id: '"capacity" must be a number',
    field: 'capacity',
    message: 'Capacity must be a number',
  },
];

export default messages;
