import axios from "axios";
import {
  EMPLOYEES_GET_FAIL,
  EMPLOYEES_GET_REQUEST,
  EMPLOYEES_GET_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_GET_FAIL,
  EMPLOYEE_GET_REQUEST,
  EMPLOYEE_GET_SUCCESS,
  EMPLOYEE_ID,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
} from "../constants/employeeConstants";

// set employee id
export const employeeIdAction = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_ID,
      payload: empId,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /api/employee -> Get all employee in the company
export const employeesGetAction = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEES_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/employee", config);
    dispatch({
      type: EMPLOYEES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: EMPLOYEES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET /api/employee/EmpId -> get data of a employee
// Get custom data from DB
export const emplpoyeeGetAction = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/employee/${empId}`, config);
    dispatch({
      type: EMPLOYEE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// POST /api/employee -> Post/add employee in the company
export const employeeCreateAction = (outputFormData) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/employee", outputFormData, config);
    dispatch({
      type: EMPLOYEE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DEL /api/employee/EmpId -> delete employee data
export const employeeDeleteAction = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/employee/${empId}`, config);
    dispatch({
      type: EMPLOYEE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: EMPLOYEE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PUT /api/employee/EmpId -> update data of a employee
export const employeeUpdateAction =
  (empId, customDataUpdate) => async (dispatch) => {
    try {
      dispatch({
        type: EMPLOYEE_UPDATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/employee/${empId}`,
        customDataUpdate,
        config
      );
      dispatch({
        type: EMPLOYEE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: EMPLOYEE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
