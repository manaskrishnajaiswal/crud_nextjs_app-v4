import React, { useEffect, useState } from "react";
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsDatabaseAdd, BsDatabase } from "react-icons/bs";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { databaseCreateAction } from "../redux/actions/databaseActions";
import { toast } from "react-toastify";
import { DATABASE_CREATE_RESET } from "../redux/constants/databaseConstants";

const AddDBForm = ({ visible, setVisiblehandler }) => {
  const dispatch = useDispatch();
  const [dbName, setDbName] = useState("");
  const [columnType, setColumnType] = useState("Number");
  const [rows, setRows] = useState([
    {
      id: 1,
      fields: { schemaField: "", schemaType: "Number" },
    },
  ]);
  const column_type_options = {
    Option1_number: "Number",
    Option2_string: "Text",
    Option3_textarea: "Textarea",
    Option4_date: "Date",
  };
  const databaseCreate = useSelector((state) => state.databaseCreate);
  const {
    loading: loadingdatabasecreate,
    success: successdatabasecreate,
    error: errordatabasecreate,
    databasecreate,
  } = databaseCreate;

  useEffect(() => {
    if (errordatabasecreate) {
      toast.error(errordatabasecreate);
      dispatch({ type: DATABASE_CREATE_RESET });
      setDbName("");
      setVisiblehandler(!visible);
    }
    if (successdatabasecreate) {
      toast.success(databasecreate.message);
      dispatch({ type: DATABASE_CREATE_RESET });
      setDbName("");
      setVisiblehandler(!visible);
    }
  }, [errordatabasecreate, successdatabasecreate, databasecreate]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      fields: { schemaField: "", schemaType: "Number" },
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleChange = (id, fieldValue, typeValue) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedFields = { ...row.fields };
        updatedFields.schemaField = fieldValue;
        updatedFields.schemaType = typeValue;
        return { ...row, fields: updatedFields };
      } else {
        return row;
      }
    });
    setRows(updatedRows);
  };

  const createDBHandler = (e) => {
    e.preventDefault();
    const model = {
      modelName: dbName,
      schemaDefinition: {},
    };
    if (dbName && model) {
      dispatch(databaseCreateAction(model));
    } else {
      toast.error("Database name is Empty...");
    }
  };

  return (
    <div className="flex justify-between ">
      <div className="bg-white p-4 rounded-md shadow-md h-32">
        <h6 className="text-xl my-2 font-bold">Database Name</h6>
        <div className="input-type">
          <input
            type="text"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            name="databaseName"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Collection Name"
            required
          />
        </div>
      </div>
      <AiOutlineArrowRight
        className="my-16"
        size={40}
        color="red"
      ></AiOutlineArrowRight>
      <div className="bg-white p-4 rounded-md shadow-md h-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-8 py-2">
                <span className="text-gray-200">Schema Field</span>
              </th>
              <th className="px-8 py-2">
                <span className="text-gray-200">Schema Type</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {rows.map((row) => (
              <tr key={row.id} className="bg-gray-50 text-center">
                <td>
                  <input
                    type="text"
                    name="databaseName"
                    value={row.fields.schemaField}
                    onChange={(e) =>
                      handleChange(row.id, e.target.value, columnType)
                    }
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                    placeholder="Enter Schema Field"
                    required
                  />
                </td>
                <td>
                  {/* <input
                    type="text"
                    name="databaseName"
                    value={row.fields.schemaType}
                    onChange={(e) =>
                      handleChange(
                        row.id,
                        row.fields.schemaField,
                        e.target.value
                      )
                    }
                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                    placeholder="Enter Schema Type"
                    required
                  /> */}
                  <Dropdown
                    column_type_options={column_type_options}
                    setColumnType={setColumnType}
                    handleChange={handleChange}
                    schemaField={row.fields.schemaField}
                    id={row.id}
                  />
                </td>
                {rows.length > 0 ? (
                  <td className="px-16 py-2 flex justify-around gap-5">
                    {rows.length === row.id && (
                      <button className="cursor" onClick={() => handleAddRow()}>
                        <AiOutlinePlusSquare
                          size={25}
                          color="green"
                        ></AiOutlinePlusSquare>
                      </button>
                    )}
                    {rows.length === row.id && row.id !== 1 && (
                      <button
                        className="cursor"
                        onClick={() => handleRemoveRow(row.id)}
                      >
                        <AiOutlineMinusSquare
                          size={25}
                          color="red"
                        ></AiOutlineMinusSquare>
                      </button>
                    )}
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AiOutlineArrowRight
        className="my-16"
        size={40}
        color="red"
      ></AiOutlineArrowRight>
      <div className="bg-white p-4 rounded-md shadow-md h-20 my-10">
        <button
          onClick={createDBHandler}
          className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
        >
          Add Schema To DB
          <span className="px-1">
            <BsDatabaseAdd size={23}></BsDatabaseAdd>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddDBForm;
