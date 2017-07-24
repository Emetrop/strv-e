import messages from '../../constants/errorMessages';

export const getInputError = (errors, fieldName) => {
  if (!errors) return '';

  // Error with defined field
  if (errors.has(fieldName)) {
    const message = messages.find(m => m.id === errors.getIn([fieldName, 'message']) && m.field === fieldName);

    return message ? message.message : errors.getIn([fieldName, 'message']);
  }

  // Error without defined field
  const generalError = messages.find(m => m.id === errors.get('error') && m.field === fieldName);

  return generalError ? generalError.message : '';
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const getFormattedDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = (date.getHours() + 24) % 12 || 12;
  const mintes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';

  return `${month} ${day}, ${year} - ${hours}:${mintes} ${ampm}`;
};
