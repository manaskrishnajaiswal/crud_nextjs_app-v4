import { Schema } from "mongoose";
import moment from "moment";

const getSchemaFromData = async (data) => {
  const schemaFields = {};
  for (const [key, value] of Object.entries(data)) {
    const valueType = typeof value;
    // console.log(valueType);
    if (
      (valueType === "object" && value instanceof Date) ||
      moment(value, "YYYY-MM-DD", true).isValid()
    ) {
      schemaFields[key] = { type: Date };
    } else if (valueType === "number") {
      schemaFields[key] = { type: Number };
    } else if (valueType === "string") {
      schemaFields[key] = { type: String };
    } else {
      throw new Error(`Unsupported type ${valueType} for field ${key}`);
    }
  }
  return new Schema(schemaFields);
};

export default getSchemaFromData;
