const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const getFormattedDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const day = date.getDay();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = (date.getHours() + 24) % 12 || 12;
  const mintes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';

  return `${month} ${day}, ${year} - ${hours}:${mintes} ${ampm}`;
};
