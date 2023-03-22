import mongoose from "mongoose";
import connectMongo from "../database/conn";

// create a model
export async function createDynamicModel(modelName, schemaDefinition) {
  await connectMongo();
  try {
    if (mongoose.connection.models[modelName]) {
      console.log("Model already exists, deleting from cache...");
      // Clear compiled model from cache
      delete mongoose.connection.models[modelName];
      // delete mongoose.connection.modelSchemas[modelName];
    }
    // const schema = new mongoose.Schema(schemaModel, { strict: false });
    const MyModel = mongoose.model(modelName, schemaDefinition);
    console.log("Model created:", MyModel.modelName);
    return MyModel;
  } catch (error) {
    console.log(error);
  }
}

// Get a list of available models in the database
export async function getModelNames() {
  // const modelNames = mongoose.modelNames();
  const collectionsCursor = await mongoose.connection.db.listCollections();
  const collections = await collectionsCursor.toArray();
  const modelNames = await collections.map((collection) => collection.name);
  return modelNames;
}

// Delete data from a specified model
export async function deleteDataFromModel(modelName, query) {
  try {
    // Connect to the database
    await connectMongo();

    // Find the model with the specified name
    const Model = mongoose.model(modelName);

    // Delete the document(s) matching the query
    const result = await Model.deleteMany(query);

    return result.deletedCount;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete data from '${modelName}'`);
  }
}
