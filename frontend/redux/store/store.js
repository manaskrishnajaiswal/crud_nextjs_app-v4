import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeGetReducer,
  employeeIdReducer,
  employeeUpdateReducer,
  employeesGetReducer,
} from "../reducers/employeeReducers";
import {
  databaseCreateReducer,
  databaseDeleteReducer,
  databaseGetReducer,
  databasesGetReducer,
  dbAllDataGetReducer,
  dbDataCreateReducer,
} from "../reducers/databaseReducers";

const bindMiddlware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducers = combineReducers({
  employeeCreate: employeeCreateReducer,
  employeesGet: employeesGetReducer,
  employeeDelete: employeeDeleteReducer,
  employeeGet: employeeGetReducer,
  employeeUpdate: employeeUpdateReducer,
  employeeId: employeeIdReducer,
  databaseCreate: databaseCreateReducer,
  databasesGet: databasesGetReducer,
  databaseDelete: databaseDeleteReducer,
  databaseGet: databaseGetReducer,
  dbDataCreate: dbDataCreateReducer,
  dbAllDataGet: dbAllDataGetReducer,
});

export const store = createStore(reducers, bindMiddlware([thunkMiddleware]));
