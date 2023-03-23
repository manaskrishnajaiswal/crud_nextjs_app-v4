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
