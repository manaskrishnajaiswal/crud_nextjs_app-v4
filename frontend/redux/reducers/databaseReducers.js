import {
  DATABASES_GET_FAIL,
  DATABASES_GET_REQUEST,
  DATABASES_GET_RESET,
  DATABASES_GET_SUCCESS,
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

export const databasesGetReducer = (state = {}, action) => {
  switch (action.type) {
    case DATABASES_GET_REQUEST:
      return { loading: true };
    case DATABASES_GET_SUCCESS:
      return { loading: false, databasesget: action.payload };
    case DATABASES_GET_FAIL:
      return { loading: false, error: action.payload };
    case DATABASES_GET_RESET:
      return {};
    default:
      return state;
  }
};