import { Schema, models, model } from "mongoose";

const employeeSchema = new Schema({}, { strict: false });

const Employee = models.Employee || model("Employee", employeeSchema);

export default Employee;
