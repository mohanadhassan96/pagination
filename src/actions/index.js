import * as Types from "../constants/ActionTypes";

export const actSearchProduct = (keyword) => {
  debugger;
  return {
    type: Types.SEARCH,
    keyword
  };
};
export const LOAD_USERS_LOADING = "REDUX_THUNK_LOAD_USERS_LOADING";
export const LOAD_USERS_SUCCESS = "REDUX_THUNK_LOAD_USERS_SUCCESS";
export const LOAD_USERS_ERROR = "REDUX_THUNK_LOAD_USERS_ERROR";

export const loadUsers = () => (dispatch) => {
  debugger;
  dispatch({ type: LOAD_USERS_LOADING });
  debugger;
  fetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  )
    .then((response) => response.json())

    .then(
      (data) => dispatch({ type: LOAD_USERS_SUCCESS, data }),
      (error) =>
        dispatch({
          type: LOAD_USERS_ERROR,
          error: error.message || "Unexpected Error!!!"
        })
    );
};
