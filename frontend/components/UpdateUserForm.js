import React, { useEffect } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { employeeUpdateAction } from "../redux/actions/employeeActions";
import { EMPLOYEE_GET_RESET } from "../redux/constants/employeeConstants";

const UpdateUserForm = ({
  EmpId,
  visisbleUpEmp,
  setVisibleUpEmphandler,
  employeeget,
}) => {
  const dispatch = useDispatch();
  const [customDataUpdate, setCustomDataUpdate] = useState({
    ...employeeget,
  });
  const [itemsMarkedForDel, setItemsMarkedForDel] = useState([]);

  const handleUpdateDataChange = (key, value) => {
    const updatedOutputForm = { ...customDataUpdate }; // create a shallow copy of the original object
    setCustomDataUpdate({ ...updatedOutputForm, [key]: value }); // set the updated object as the new state
  };
  const employeeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    const model = {
      customDataUpdate: customDataUpdate,
      itemsMarkedForDel: itemsMarkedForDel,
    };
    dispatch(employeeUpdateAction(EmpId, model));
    setVisibleUpEmphandler("");
  };
  const addEmpIdForDel = (key) => {
    console.log(key);
    if (itemsMarkedForDel.includes(key)) {
      let index = itemsMarkedForDel.indexOf(key);
      setItemsMarkedForDel((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });
    } else {
      setItemsMarkedForDel((prevItems) => [...prevItems, key]);
    }
  };
  console.log(itemsMarkedForDel);
  return (
    <div className="bg-gray-200">
      <Form
        className="grid lg:grid-cols-4 w-4/8 gap-4"
        onSubmit={employeeUpdateSubmitHandler}
      >
        {Object.keys(customDataUpdate).map((key, index) => (
          <div className="mx-auto my-4" key={index}>
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              moment(customDataUpdate[key], "YYYY-MM-DD", true).isValid() && (
                <>
                  <Form.Group
                    style={{
                      backgroundColor: itemsMarkedForDel.includes(key)
                        ? "#E94E3E"
                        : "",
                    }}
                    className="flex rounded-lg border-yellow-500 border-2 p-4"
                  >
                    <div>
                      <Form.Label>
                        <strong>{key}</strong>
                      </Form.Label>
                      <br></br>
                      <Form.Control
                        className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                        type="Date"
                        placeholder={`Enter ${key}`}
                        value={customDataUpdate[key]}
                        onChange={(event) =>
                          handleUpdateDataChange(key, event.target.value)
                        }
                        required
                        autoComplete="none"
                      ></Form.Control>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => addEmpIdForDel(key)}
                      className="hover:text-red-600 py-2 px-4"
                    >
                      <AiOutlineDelete size={40}></AiOutlineDelete>
                    </div>
                  </Form.Group>
                </>
              )}
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              typeof customDataUpdate[key] === "number" && (
                <>
                  <Form.Group
                    style={{
                      backgroundColor: itemsMarkedForDel.includes(key)
                        ? "#E94E3E"
                        : "",
                    }}
                    className="flex rounded-lg border-yellow-500 border-2 p-4"
                  >
                    <div>
                      <Form.Label>
                        <strong>{key}</strong>
                      </Form.Label>
                      <br></br>
                      <Form.Control
                        className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                        type="Number"
                        placeholder={`Enter ${key}`}
                        value={customDataUpdate[key]}
                        onChange={(event) =>
                          handleUpdateDataChange(
                            key,
                            Number(event.target.value)
                          )
                        }
                        required
                        autoComplete="none"
                      ></Form.Control>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => addEmpIdForDel(key)}
                      className=" hover:text-red-600 py-2 px-4"
                    >
                      <AiOutlineDelete size={40}></AiOutlineDelete>
                    </div>
                  </Form.Group>
                </>
              )}
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              typeof customDataUpdate[key] === "string" &&
              customDataUpdate[key].length <= 10 &&
              !moment(customDataUpdate[key], "YYYY-MM-DD", true).isValid() && (
                <>
                  <Form.Group
                    style={{
                      backgroundColor: itemsMarkedForDel.includes(key)
                        ? "#E94E3E"
                        : "",
                    }}
                    className="flex rounded-lg border-yellow-500 border-2 p-4"
                  >
                    <div>
                      <Form.Label>
                        <strong>{key}</strong>
                      </Form.Label>
                      <br></br>
                      <Form.Control
                        className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                        type="Text"
                        placeholder={`Enter ${key}`}
                        value={customDataUpdate[key]}
                        onChange={(event) =>
                          handleUpdateDataChange(key, event.target.value)
                        }
                        required
                        autoComplete="none"
                      ></Form.Control>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => addEmpIdForDel(key)}
                      className=" hover:text-red-600 py-2 px-4"
                    >
                      <AiOutlineDelete size={40}></AiOutlineDelete>
                    </div>
                  </Form.Group>
                </>
              )}
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              typeof customDataUpdate[key] === "string" &&
              customDataUpdate[key].length > 10 &&
              !moment(customDataUpdate[key], "YYYY-MM-DD", true).isValid() && (
                <>
                  <Form.Group
                    style={{
                      backgroundColor: itemsMarkedForDel.includes(key)
                        ? "#E94E3E"
                        : "",
                    }}
                    className="flex rounded-lg border-yellow-500 border-2 p-4"
                  >
                    <div>
                      <Form.Label>
                        <strong>{key}</strong>
                      </Form.Label>
                      <br></br>
                      <Form.Control
                        className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                        as="textarea"
                        rows={3}
                        placeholder={`Enter ${key}`}
                        value={customDataUpdate[key]}
                        onChange={(event) =>
                          handleUpdateDataChange(key, event.target.value)
                        }
                        required
                        autoComplete="none"
                      ></Form.Control>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => addEmpIdForDel(key)}
                      className=" hover:text-red-600 py-2 px-4"
                    >
                      <AiOutlineDelete size={40}></AiOutlineDelete>
                    </div>
                  </Form.Group>
                </>
              )}
          </div>
        ))}
        <br></br>
        <button
          type="submit"
          className="mx-20 my-4 flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
        >
          <span className="px-1 my-auto">Update</span>
          <span className="px-1 my-auto">
            <BiPlus size={24}></BiPlus>
          </span>
        </button>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
