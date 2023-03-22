import React from "react";
import { employeeUpdateAction } from "../redux/actions/employeeActions";
import { Form } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";

const OutputForm = ({
  EmpId,
  outputForm,
  setOutputForm,
  visibleAddNewEmpData,
  setVisibleAddNewEmpData,
}) => {
  const dispatch = useDispatch();
  const handleDataChange = (index, event) => {
    const newItems = [...outputForm];
    newItems[index].colData = event.target.value;
    setOutputForm(newItems);
  };
  const outputFormSubmitHandler = (e) => {
    e.preventDefault();
    const formObject = {};
    outputForm.forEach((item) => {
      formObject[item.colName] = item.colData;
    });
    let model = { customDataUpdate: formObject };
    dispatch(employeeUpdateAction(EmpId, model));
    setOutputForm([]);
    setVisibleAddNewEmpData(!visibleAddNewEmpData);
  };
  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Output Form</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          <tr>
            <td>
              <Form
                className="grid lg:grid-cols-4 w-4/8 gap-4"
                onSubmit={outputFormSubmitHandler}
              >
                {outputForm.map((data, index) => (
                  <div className="mx-auto my-4" key={index}>
                    {(data.colType === "Number" ||
                      data.colType === "Text" ||
                      data.colType === "Date") && (
                      <Form.Group>
                        <Form.Label>
                          <strong>{data.colName}</strong>
                        </Form.Label>
                        <br></br>
                        <Form.Control
                          className="px-2 py-2"
                          type={data.colType}
                          placeholder={`Enter ${data.colType}`}
                          value={data.colData}
                          onChange={(event) => handleDataChange(index, event)}
                          required
                          autoComplete="none"
                        ></Form.Control>
                      </Form.Group>
                    )}
                    {data.colType === "Textarea" && (
                      <Form.Group>
                        <Form.Label>
                          <strong>{data.colName}</strong>
                        </Form.Label>
                        <br></br>
                        <Form.Control
                          className="px-2 py-2"
                          as="textarea"
                          rows={3}
                          placeholder={`Enter ${data.colType}`}
                          value={data.colData}
                          onChange={(event) => handleDataChange(index, event)}
                          required
                          autoComplete="none"
                        ></Form.Control>
                      </Form.Group>
                    )}
                  </div>
                ))}
                <br></br>
                <button
                  type="submit"
                  className="mx-20 my-4 flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
                >
                  <span className="px-1 my-auto">Add</span>
                  <span className="px-1 my-auto">
                    <BiPlus size={24}></BiPlus>
                  </span>
                </button>
              </Form>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OutputForm;
