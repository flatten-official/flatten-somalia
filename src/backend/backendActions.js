import backend from "./backend";

export const submitForm = (formName, route, formValues, done) => async (dispatch) => {
  let submitSuccess;
  try {
    const response = await backend.post(route, formValues);
    console.log(response);
    done(response, null);
    submitSuccess = response.data;
  } catch (e) {
      console.log("eeeeee");
    done(null, e);
    submitSuccess = false;
  }

  dispatch({ type: `SUBMIT_FORM_${formName}`, payload: submitSuccess });
};