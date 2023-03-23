import { Schema } from "mongoose";

const getSchemaForModel = async (data) => {
  const schemaFields = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === "Date") {
      schemaFields[key] = { type: Date };
    } else if (value === "Number") {
      schemaFields[key] = { type: Number };
    } else if (value === "Text") {
      schemaFields[key] = { type: String };
    } else if (value === "Textarea") {
      schemaFields[key] = { type: String };
    } else {
      throw new Error(`Unsupported type ${value} for field ${key}`);
    }
  }
  return new Schema(schemaFields);
};

export default getSchemaForModel;
