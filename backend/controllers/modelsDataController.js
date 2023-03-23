import mongoose from "mongoose";
import moment from "moment";
import { createDynamicModel, getModelNames } from "../config/lib/dbHelperFunc";
import connectMongo from "../config/database/conn";
import getSchemaForModel from "../config/lib/getSchemaForModel";
import fs from "fs";
import path from "path";
const schemaFolderPath = path.join(
  "D:",
  "MERN Completed Projects",
  "crud_nextjs_app-v4",
  "backend",
  "config",
  "schemaFolder"
);

// POST /api/modelsData/modelsReq/[modeName] -> create data of a DB
export async function createDBData(req, res) {
  const { modelName } = req.query;
  const modelData = req.body;
  Object.keys(modelData).forEach((key) => {
    if (moment(modelData[key], "YYYY-MM-DD", true).isValid()) {
      modelData[key] = new Date(modelData[key]);
    }
  });
  try {
    if (!modelName)
      return res
        .status(400)
        .json({ message: "Model name does not send through request!" });
    // Get a list of available models in the database
    const modelNames = await getModelNames();
    if (modelNames.includes(modelName)) {
      if (mongoose.connection.models[modelName]) {
        console.log("Model already exists, deleting from cache...");
        // Clear compiled model from cache
        delete mongoose.connection.models[modelName];
        // delete mongoose.connection.modelSchemas[modelName];
      }
      const filePath = path.join(schemaFolderPath, `${modelName}.json`);
      const schemaFromStoredFile = JSON.parse(fs.readFileSync(filePath));
      const modDBCustomSchema = await getSchemaForModel(schemaFromStoredFile);
      const MyModelFetch = mongoose.model(modelName, modDBCustomSchema);
      const result = await MyModelFetch.create(modelData);
      if (result) {
        console.log({
          message: `Model: ${modelName} found in database! and data inserted successfully`,
          model: modelName,
          result: result,
          found: true,
        });
      }
      res.status(200).json({
        message: `Model: ${modelName} found in database! and data inserted successfully`,
        model: modelName,
        result: result,
        found: true,
      });
    } else {
      res.status(404).json({
        message: `Model: ${modelName} do not found!`,
        model: modelName,
        found: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to fetch models`, error: error });
  }
}

// GET /api/modelApi/modelsData/[modeName] -> get all data from db
export async function getDBData(req, res) {
  const { modelName } = req.query;
  try {
    if (!modelName)
      return res
        .status(400)
        .json({ message: "Model name does not send through request!" });
    // Get a list of available models in the database
    const modelNames = await getModelNames();
    if (modelNames.includes(modelName)) {
      if (mongoose.connection.models[modelName]) {
        console.log("Model already exists, deleting from cache...");
        // Clear compiled model from cache
        delete mongoose.connection.models[modelName];
        // delete mongoose.connection.modelSchemas[modelName];
      }
      const filePath = path.join(schemaFolderPath, `${modelName}.json`);
      const schemaFromStoredFile = JSON.parse(fs.readFileSync(filePath));
      const modDBCustomSchema = await getSchemaForModel(schemaFromStoredFile);
      const MyModelFetch = mongoose.model(modelName, modDBCustomSchema);
      const result = await MyModelFetch.find({});
      const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000Z$/;
      const modifiedresult = result.map((doc) => {
        const obj = doc.toObject();
        Object.keys(obj).forEach((key) => {
          if (obj[key] instanceof Date) {
            const dateString = obj[key].toISOString();
            // console.log("This is a Date object");
            if (regex.test(dateString)) {
              // console.log("String matches the pattern");
              obj[key] = dateString.slice(0, 10);
            } else {
              // console.log("String does not match the pattern");
            }
          } else {
            // console.log("This is not a Date object");
          }
          // console.log(`${key}-${obj[key]}`);
        });
        return obj;
      });
      // if (modifiedresult) {
      //   console.log({
      //     message: `Model: ${modelName} found in database! and all data fetched successfully`,
      //     model: modelName,
      //     result: modifiedresult,
      //     found: true,
      //   });
      // }
      res.status(200).json({
        message: `Model: ${modelName} found in database! and all data fetched successfully`,
        model: modelName,
        result: modifiedresult,
        found: true,
      });
    } else {
      res.status(404).json({
        message: `Model: ${modelName} do not found!`,
        model: modelName,
        found: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to fetch models`, error: error });
  }
}

// DEL /api/modelApi/modelsData/[modeName] -> delete a model data from a database
export async function deleteDBData(req, res) {
  const { modelName } = req.query;
  const { dbDataId } = req.body;
  try {
    if (!modelName)
      return res
        .status(400)
        .json({ message: "Model name does not send through request!" });
    // Get a list of available models in the database
    const modelNames = await getModelNames();
    if (modelNames.includes(modelName)) {
      if (mongoose.connection.models[modelName]) {
        console.log("Model already exists, deleting from cache...");
        // Clear compiled model from cache
        delete mongoose.connection.models[modelName];
        // delete mongoose.connection.modelSchemas[modelName];
      }
      const filePath = path.join(schemaFolderPath, `${modelName}.json`);
      const schemaFromStoredFile = JSON.parse(fs.readFileSync(filePath));
      const modDBCustomSchema = await getSchemaForModel(schemaFromStoredFile);
      const MyModelFetch = mongoose.model(modelName, modDBCustomSchema);
      const foundDBData = await MyModelFetch.findById(dbDataId);
      if (foundDBData) {
        const removeResult = await foundDBData.remove();
        return res.status(200).json({
          message: `Model: ${modelName} found in database! and data removed successfully`,
          model: modelName,
          removeResult: removeResult,
          found: true,
        });
      } else {
        return res.status(404).json({ message: "Custom data not found" });
      }
    } else {
      return res.status(404).json({
        message: `Model: ${modelName} do not found!`,
        model: modelName,
        found: false,
      });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}
