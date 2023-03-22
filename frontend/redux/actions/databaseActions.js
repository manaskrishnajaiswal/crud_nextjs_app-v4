import axios from "axios";
import {
  DATABASES_GET_FAIL,
  DATABASES_GET_REQUEST,
  DATABASES_GET_SUCCESS,
  DATABASE_CREATE_FAIL,
  DATABASE_CREATE_REQUEST,
  DATABASE_CREATE_SUCCESS,
} from "../constants/databaseConstants";

// POST /api/modelApi/modelsReq -> create a model in the databse
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

// GET /api/modelApi/modelsReq -> get list of availble models in database
export const databsesGetAction = () => async (dispatch) => {
  try {
    dispatch({
      type: DATABASES_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/modelApi/modelsReq", config);
    dispatch({
      type: DATABASES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DATABASES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};