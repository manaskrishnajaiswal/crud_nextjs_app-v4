import {
  EMPLOYEES_GET_FAIL,
  EMPLOYEES_GET_REQUEST,
  EMPLOYEES_GET_RESET,
  EMPLOYEES_GET_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_RESET,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_RESET,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_GET_FAIL,
  EMPLOYEE_GET_REQUEST,
  EMPLOYEE_GET_RESET,
  EMPLOYEE_GET_SUCCESS,
  EMPLOYEE_ID,
  EMPLOYEE_ID_RESET,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_RESET,
  EMPLOYEE_UPDATE_SUCCESS,
} from "../constants/employeeConstants";

export const employeeIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_ID:
      return { success: true, employeeid: action.payload };
    case EMPLOYEE_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_CREATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_CREATE_SUCCESS:
      return { loading: false, success: true, employeecreate: action.payload };
    case EMPLOYEE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const employeesGetReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEES_GET_REQUEST:
      return { loading: true };
    case EMPLOYEES_GET_SUCCESS:
      return { loading: false, employeesget: action.payload };
    case EMPLOYEES_GET_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEES_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_DELETE_REQUEST:
      return { loading: true };
    case EMPLOYEE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        employeedelete: action.payload,
      };
    case EMPLOYEE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeGetReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_GET_REQUEST:
      return { loading: true };
    case EMPLOYEE_GET_SUCCESS:
      return { loading: false, employeeget: action.payload };
    case EMPLOYEE_GET_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_UPDATE_SUCCESS:
      return { loading: false, success: true, employeeupdate: action.payload };
    case EMPLOYEE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
