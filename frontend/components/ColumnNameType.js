import React from "react";
import Dropdown from "./Dropdown";

const ColumnNameType = ({ columnName, setColumnName, setColumnType }) => {
  const column_type_options = {
    Option1_number: "Number",
    Option2_string: "Text",
    Option3_textarea: "Textarea",
    Option4_date: "Date",
    Option5_dropdown: "Dropdown",
  };
  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Column Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Column Type</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          <tr className="bg-gray-50 text-center">
            <td className="px-16 py-2">
              <input
                type="text"
                onChange={(e) => setColumnName(e.target.value)}
                value={columnName}
                name="columnName"
                className="border px-5 py-3 focus:outline-none rounded-md"
                placeholder="Enter Column Name"
                required
                autoComplete="none"
              />
            </td>
            <td className="px-16 py-2">
              <Dropdown
                column_type_options={column_type_options}
                setColumnType={setColumnType}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ColumnNameType;
