import React from "react";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import { Form } from "react-bootstrap";

const ColumnData = ({
  columnData,
  setColumnData,
  columnName,
  setColumnName,
  columnType,
  outputForm,
  setOutputForm,
}) => {
  const columnDatahandler = async () => {
    if (columnType === "Number") {
      outputForm.push({
        colName: columnName,
        colData: Number(columnData),
        colType: columnType,
      });
    } else if (columnType === "Text" || columnType === "Textarea") {
      outputForm.push({
        colName: columnName,
        colData: columnData,
        colType: columnType,
      });
    } else if (columnType === "Date") {
      outputForm.push({
        colName: columnName,
        colData: columnData,
        colType: columnType,
      });
    } else {
      outputForm.push({
        colName: columnName,
        colData: columnData,
        colType: columnType,
      });
    }
    setOutputForm(outputForm);
    setColumnName("");
    setColumnData("");
  };
  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Column Data</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          <tr className="bg-gray-50 text-left">
            <td className="mx-64 px-64 py-4 flex flex-row items-center">
              {/* <Dropdown column_type_options={column_type_options} /> */}
              {(columnType === "Number" ||
                columnType === "Text" ||
                columnType === "Date") && (
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label>
                      <strong>Enter {columnType}</strong>
                    </Form.Label>
                    <br></br>
                    <Form.Control
                      className="px-2 py-2"
                      type={columnType}
                      placeholder={`Enter ${columnType}`}
                      value={columnData}
                      onChange={(e) => setColumnData(e.target.value)}
                      required
                      autoComplete="none"
                    ></Form.Control>
                  </Form.Group>
                </Form>
              )}
              {columnType === "Textarea" && (
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label className="my-2">
                      <strong>Enter {columnType}</strong>
                    </Form.Label>
                    <br></br>
                    <Form.Control
                      className="px-2 py-2"
                      as="textarea"
                      rows={3}
                      placeholder={`Enter ${columnType}`}
                      value={columnData}
                      onChange={(e) => setColumnData(e.target.value)}
                      required
                      autoComplete="none"
                    ></Form.Control>
                  </Form.Group>
                </Form>
              )}
              <button
                onClick={columnDatahandler}
                className="flex bg-indigo-500 text-white mx-4 px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
              >
                {" "}
                <span className="px-1">
                  <BiUserPlus size={23}></BiUserPlus>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ColumnData;
