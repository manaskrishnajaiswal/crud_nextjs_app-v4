import {
  DATABASES_GET_FAIL,
  DATABASES_GET_REQUEST,
  DATABASES_GET_RESET,
  DATABASES_GET_SUCCESS,
  DATABASE_CREATE_FAIL,
  DATABASE_CREATE_REQUEST,
  DATABASE_CREATE_RESET,
  DATABASE_CREATE_SUCCESS,
  DATABASE_DELETE_FAIL,
  DATABASE_DELETE_REQUEST,
  DATABASE_DELETE_RESET,
  DATABASE_DELETE_SUCCESS,
  DATABASE_GET_FAIL,
  DATABASE_GET_REQUEST,
  DATABASE_GET_RESET,
  DATABASE_GET_SUCCESS,
  DB_ALL_DATA_GET_FAIL,
  DB_ALL_DATA_GET_REQUEST,
  DB_ALL_DATA_GET_RESET,
  DB_ALL_DATA_GET_SUCCESS,
  DB_DATA_CREATE_FAIL,
  DB_DATA_CREATE_REQUEST,
  DB_DATA_CREATE_RESET,
  DB_DATA_CREATE_SUCCESS,
  DB_DATA_DELETE_FAIL,
  DB_DATA_DELETE_REQUEST,
  DB_DATA_DELETE_RESET,
  DB_DATA_DELETE_SUCCESS,
  DB_DATA_GET_FAIL,
  DB_DATA_GET_REQUEST,
  DB_DATA_GET_RESET,
  DB_DATA_GET_SUCCESS,
  DB_DATA_UPDATE_FAIL,
  DB_DATA_UPDATE_REQUEST,
  DB_DATA_UPDATE_RESET,
  DB_DATA_UPDATE_SUCCESS,
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

export const databaseGetReducer = (state = {}, action) => {
  switch (action.type) {
    case DATABASE_GET_REQUEST:
      return { loading: true };
    case DATABASE_GET_SUCCESS:
      return { loading: false, databaseget: action.payload };
    case DATABASE_GET_FAIL:
      return { loading: false, error: action.payload };
    case DATABASE_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const databaseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DATABASE_DELETE_REQUEST:
      return { loading: true };
    case DATABASE_DELETE_SUCCESS:
      return { loading: false, success: true, databasedelete: action.payload };
    case DATABASE_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DATABASE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const dbDataCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DB_DATA_CREATE_REQUEST:
      return { loading: true };
    case DB_DATA_CREATE_SUCCESS:
      return { loading: false, success: true, dbdatacreate: action.payload };
    case DB_DATA_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DB_DATA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const dbAllDataGetReducer = (state = {}, action) => {
  switch (action.type) {
    case DB_ALL_DATA_GET_REQUEST:
      return { loading: true };
    case DB_ALL_DATA_GET_SUCCESS:
      return { loading: false, success: true, dballdataget: action.payload };
    case DB_ALL_DATA_GET_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DB_ALL_DATA_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const dbDataGetReducer = (state = {}, action) => {
  switch (action.type) {
    case DB_DATA_GET_REQUEST:
      return { loading: true };
    case DB_DATA_GET_SUCCESS:
      return { loading: false, success: true, dbdataget: action.payload };
    case DB_DATA_GET_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DB_DATA_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const dbDataUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DB_DATA_UPDATE_REQUEST:
      return { loading: true };
    case DB_DATA_UPDATE_SUCCESS:
      return { loading: false, success: true, dbdataupdate: action.payload };
    case DB_DATA_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DB_DATA_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const dbDataDelReducer = (state = {}, action) => {
  switch (action.type) {
    case DB_DATA_DELETE_REQUEST:
      return { loading: true };
    case DB_DATA_DELETE_SUCCESS:
      return { loading: false, success: true, dbdatadelete: action.payload };
    case DB_DATA_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DB_DATA_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
