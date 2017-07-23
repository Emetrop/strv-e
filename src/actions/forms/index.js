import * as actionTypes from '../../constants/actionTypes';

export const setFormErrors = (formName, errors) => ({
  type: actionTypes.SET_FORM_ERRORS,
  payload: {
    formName,
    errors,
  },
});
