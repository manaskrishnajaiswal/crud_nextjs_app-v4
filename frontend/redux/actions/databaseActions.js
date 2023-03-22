import axios from "axios";
import {
  DATABASE_CREATE_FAIL,
  DATABASE_CREATE_REQUEST,
  DATABASE_CREATE_SUCCESS,
} from "../constants/databaseConstants";

// POST /api/employee -> Post/add employee in the company
export const databaseCreateAction = (outputFormData) => async (dispatch) => {
  try {
    dispatch({
      type: DATABASE_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/modelApi/modelsReq",
      outputFormData,
      config
    );
    dispatch({
      type: DATABASE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DATABASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
