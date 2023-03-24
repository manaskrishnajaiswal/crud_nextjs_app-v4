import axios from "axios";
import {
  DATABASES_GET_FAIL,
  DATABASES_GET_REQUEST,
  DATABASES_GET_SUCCESS,
  DATABASE_CREATE_FAIL,
  DATABASE_CREATE_REQUEST,
  DATABASE_CREATE_SUCCESS,
  DATABASE_DELETE_FAIL,
  DATABASE_DELETE_REQUEST,
  DATABASE_DELETE_SUCCESS,
  DATABASE_GET_FAIL,
  DATABASE_GET_REQUEST,
  DATABASE_GET_SUCCESS,
  DB_ALL_DATA_GET_FAIL,
  DB_ALL_DATA_GET_REQUEST,
  DB_ALL_DATA_GET_SUCCESS,
  DB_DATA_CREATE_FAIL,
  DB_DATA_CREATE_REQUEST,
  DB_DATA_CREATE_SUCCESS,
  DB_DATA_DELETE_FAIL,
  DB_DATA_DELETE_REQUEST,
  DB_DATA_DELETE_SUCCESS,
  DB_DATA_GET_FAIL,
  DB_DATA_GET_REQUEST,
  DB_DATA_GET_SUCCESS,
  DB_DATA_UPDATE_FAIL,
  DB_DATA_UPDATE_REQUEST,
  DB_DATA_UPDATE_SUCCESS,
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

// GET /api/modelApi/modelsReq -> get list of availble models in database
export const databseGetAction = (dbName) => async (dispatch) => {
  try {
    dispatch({
      type: DATABASE_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/modelApi/modelsReq/${dbName}`,
      config
    );
    dispatch({
      type: DATABASE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DATABASE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DEL /api/modelApi/modelsReq/[modeName] -> delete a model from a database
export const databaseDeleteAction = (dbName) => async (dispatch) => {
  try {
    dispatch({
      type: DATABASE_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/modelApi/modelsReq/${dbName}`,
      config
    );
    dispatch({
      type: DATABASE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DATABASE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET /api/modelsData/modelsReq -> get all data from db
export const dbAllDataGetAction = (dbName) => async (dispatch) => {
  try {
    dispatch({
      type: DB_ALL_DATA_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/modelApi/modelsData/${dbName}`,
      config
    );
    dispatch({
      type: DB_ALL_DATA_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DB_ALL_DATA_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET /api/modelApi/modelsData/[modeName]/[modelData] -> get individual model data from db
export const dbDataGetAction = (dbName, modelDataId) => async (dispatch) => {
  try {
    dispatch({
      type: DB_DATA_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/modelApi/modelsData/${dbName}/${modelDataId}`,
      config
    );
    dispatch({
      type: DB_DATA_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DB_DATA_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET /api/modelApi/modelsData/[modeName]/[modelData] -> update individual model data from db
export const dbDataUpdateAction =
  ({ modelName, modelDataId, modelData }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DB_DATA_UPDATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/modelApi/modelsData/${modelName}/${modelDataId}`,
        modelData,
        config
      );
      dispatch({
        type: DB_DATA_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: DB_DATA_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// POST /api/modelApi/modelsData/[modeName] -> create data of a DB
export const dbDataCreateAction =
  ({ modelName, modelData }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DB_DATA_CREATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/modelApi/modelsData/${modelName}`,
        modelData,
        config
      );
      dispatch({
        type: DB_DATA_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: DB_DATA_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// DEL /api/modelApi/modelsData/[modeName] -> delete a model data from a database
export const dbDataDelAction = (modelName, modelDataId) => async (dispatch) => {
  try {
    dispatch({
      type: DB_DATA_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/modelApi/modelsData/${modelName}`,
      { data: modelDataId },
      config
    );
    dispatch({
      type: DB_DATA_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: DB_DATA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
