import {
  DATABASE_CREATE_FAIL,
  DATABASE_CREATE_REQUEST,
  DATABASE_CREATE_RESET,
  DATABASE_CREATE_SUCCESS,
} from "../constants/databaseConstants";

export const databaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DATABASE_CREATE_REQUEST:
      return { loading: true };
    case DATABASE_CREATE_SUCCESS:
      return { loading: false, success: true, databasecreate: action.payload };
    case DATABASE_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DATABASE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
