export default (formName) => (state = {}, action) => {
  switch (action.type) {
    case `SUBMIT_FORM_${formName}`:
      return { ...state, response: action.payload };
    default:
      return state;
  }
};
