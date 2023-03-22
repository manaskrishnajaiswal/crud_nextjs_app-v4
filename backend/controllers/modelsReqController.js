import mongoose from "mongoose";
import { createDynamicModel, getModelNames } from "../config/lib/dbHelperFunc";
import connectMongo from "../config/database/conn";

// POST /api/modelApi/modelsReq -> create a model in the databse
export async function createModel(req, res) {
  const { modelName, schemaDefinition } = req.body;
  try {
    const modelNames = await getModelNames();
    if (modelNames.includes(modelName)) {
      return res.status(200).json({
        message: `Model: ${modelName} already existed in database!, No new model created!!`,
        model: modelName,
        found: true,
      });
    }
    const Model = await createDynamicModel(modelName, schemaDefinition);
    res.status(200).json({
      message: `Model '${modelName}' created successfully!`,
      model: Model,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// GET /api/modelApi/modelsReq -> get list of availble models in database
export async function getModels(req, res) {
  try {
    // Get a list of available models in the database
    const modelNames = await getModelNames();
    if (modelNames.length > 0) {
      res.status(200).json({
        message: `Models list fetched successfully!`,
        models: modelNames,
      });
    } else {
      res.status(200).json({
        message: `Models list is Empty!`,
        models: modelNames,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch models` });
  }
}

// GET /api/modelApi/modelsReq/[modelName] -> find a model in database
export async function getModel(req, res) {
  const { modelName } = req.query;
  try {
    if (!modelName)
      return res
        .status(400)
        .json({ message: "Model name does not send through request!" });
    // Get a list of available models in the database
    const modelNames = await getModelNames();
    const schema = mongoose.model(modelName).schema;
    if (modelNames.includes(modelName)) {
      res.status(200).json({
        message: `Model: ${modelName} found in database!`,
        model: modelName,
        schema: schema,
        found: true,
      });
    } else {
      res.status(404).json({
        message: `Model: ${modelName} do not found!`,
        model: modelName,
        schema: schema,
        found: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to fetch models`, error: error });
  }
}

// DEL /api/modelApi/modelsReq/[modelName] -> delete a model from database
export async function deleteModel(req, res) {
  const { modelName } = req.query;
  try {
    // Connect to the database
    await connectMongo();
    if (!modelName) {
      return res
        .status(400)
        .json({ message: "Model name not provided in request!" });
    }
    const modelNames = await getModelNames();
    if (!modelNames.includes(modelName)) {
      return res.status(404).json({
        message: `Model: ${modelName} do not found!`,
        model: modelName,
      });
    }
    // Drop the specified collection
    const result = await mongoose.connection.db.dropCollection(modelName);
    if (result) {
      res.status(200).json({
        message: `${modelName} collection dropped successfully!`,
        result: result,
      });
    } else {
      res.status(400).json({
        message: `Error dropping collection- ${modelName}`,
        result: result,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Failed to drop ${modelName} collection`, error });
  }
}
