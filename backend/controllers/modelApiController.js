import { getModelNames } from "../config/lib/dbHelperFunc";

// Handle the API request to delete data from a specified model
export default async function deleteDataHandler(req, res) {
  const { modelName, query } = req.body;
  try {
    // Get a list of available models in the database
    const modelNames = await getModelNames();

    // Check if the specified model exists in the database
    if (!modelNames.includes(modelName)) {
      return res
        .status(404)
        .json({ message: `Model '${modelName}' not found in the database` });
    }

    // Delete data from the specified model
    const deletedCount = await deleteDataFromModel(modelName, query);
    res.status(200).json({
      message: `Deleted ${deletedCount} documents from '${modelName}' successfully!`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Failed to delete data from '${modelName}'` });
  }
}
