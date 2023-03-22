import moment from "moment";
import _ from "lodash";
import getSchemaFromData from "../config/lib/getSchemaFromData";
import Employee from "../models/employeeModel";

// POST /api/employee -> Post/add employee in the company
export async function postEmployeeData(req, res) {
  try {
    const outFormData = req.body;
    Object.keys(outFormData).forEach((key) => {
      if (moment(outFormData[key], "YYYY-MM-DD", true).isValid()) {
        outFormData[key] = new Date(outFormData[key]);
      }
    });
    const currentdate = new Date();
    outFormData.createdAt = currentdate;
    const modDBCustomSchema = await getSchemaFromData(outFormData);
    const newDBCustomData = new Employee(outFormData);
    newDBCustomData.schema = modDBCustomSchema;
    const result = await newDBCustomData.save();
    res.status(200).send({ result, message: "Data created successfully" });
  } catch (error) {
    return res.status(404).json({ error, message: "Error creating Data" });
  }
}

// GET /api/employee -> Get all employee in the company
export async function getEmployeesData(req, res) {
  try {
    const customData = await Employee.find({});
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000Z$/;
    const modifiedData = customData.map((doc) => {
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
    // console.log(modifiedData);
    if (!modifiedData) return res.status(404).json({ error: "Data not Found" });
    res.status(200).send(modifiedData);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// DEL /api/employee/EmpId -> delete employee data
export async function deleteEmployeeData(req, res) {
  try {
    const { EmpId } = req.query;
    const customData = await Employee.findById(EmpId);

    if (customData) {
      await customData.remove();
      res.status(200).json({ message: "Custom data deleted successfully" });
    } else {
      res.status(404);
      res.json({ message: "Custom data not found" });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// GET /api/employee/EmpId -> get data of a employee
export async function getEmployeeData(req, res) {
  try {
    const { EmpId } = req.query;
    const customData = await Employee.findById(EmpId).lean();
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000Z$/;
    const updatedData = {};
    Object.keys(customData).forEach((key) => {
      // console.log(`${key}-${customData[key]}`);
      if (customData[key] instanceof Date) {
        const dateString = customData[key].toISOString();
        // console.log("This is a Date object");
        if (regex.test(dateString)) {
          // console.log("String matches the pattern");
          updatedData[key] = dateString.slice(0, 10);
        } else {
          // console.log("String does not match the pattern");
          updatedData[key] = customData[key];
        }
      } else {
        // console.log("This is not a Date object");
        updatedData[key] = customData[key];
      }
      // console.log(`${key}-${updatedData[key]}`);
    });
    // console.log(updatedData);
    if (customData) {
      res.status(200).send(updatedData);
    } else {
      res.status(404);
      res.json({ message: "CustomData not found" });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// PUT /api/employee/EmpId -> update data of a employee
export async function putEmployeeData(req, res) {
  try {
    const { EmpId } = req.query;
    const formData = req.body.customDataUpdate || {};
    const markedForDelete = req.body.itemsMarkedForDel || {};
    const unsetObject = {};
    if (!_.isEmpty(markedForDelete)) {
      for (const key of markedForDelete) {
        unsetObject[key] = 1;
      }
    }
    const customData = await Employee.findById(EmpId);
    if (!customData) {
      return res.status(404).json({ message: "customData not found" });
    }
    const updatedData = {};
    Object.keys(formData).forEach((key) => {
      if (moment(formData[key], "YYYY-MM-DD", true).isValid()) {
        updatedData[key] = new Date(formData[key]) || customData[key];
      } else {
        updatedData[key] = formData[key] || customData[key];
      }
    });
    const currentdate = new Date();
    updatedData.createdAt = currentdate;
    const updatedCustomData = await Employee.findByIdAndUpdate(
      EmpId,
      updatedData,
      { new: true }
    );
    const unsetCustomData = await Employee.findByIdAndUpdate(
      EmpId,
      { $unset: unsetObject },
      { new: true }
    );
    res.status(200).json({
      message: "User updated successfully",
      data: unsetCustomData,
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}
