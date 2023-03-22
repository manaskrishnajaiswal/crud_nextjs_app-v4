import React from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const ViewUserForm = ({ EmpId, setVisibleUpEmphandler, employeeget }) => {
  const [customDataUpdate, setCustomDataUpdate] = useState({
    ...employeeget,
  });

  return (
    <div className="bg-yellow-200 rounded-lg border-yellow-500 border-2 p-4">
      <Form className="grid lg:grid-cols-4 w-4/8 gap-4">
        {Object.keys(customDataUpdate).map((key, index) => (
          <div className="mx-auto my-4" key={index}>
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              moment(customDataUpdate[key], "YYYY-MM-DD", true).isValid() && (
                <>
                  <Form.Group className="rounded-lg border-yellow-500 border-2 p-4">
                    <Form.Label>
                      <strong>{key}</strong>
                    </Form.Label>
                    <br></br>
                    <Form.Control
                      className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                      type="Date"
                      placeholder={`Enter ${key}`}
                      value={customDataUpdate[key]}
                      readOnly
                      autoComplete="none"
                    ></Form.Control>
                  </Form.Group>
                </>
              )}
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              typeof customDataUpdate[key] === "number" && (
                <Form.Group className="rounded-lg border-yellow-500 border-2 p-4">
                  <Form.Label>
                    <strong>{key}</strong>
                  </Form.Label>
                  <br></br>
                  <Form.Control
                    className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                    type="Number"
                    placeholder={`Enter ${key}`}
                    value={customDataUpdate[key]}
                    readOnly
                    autoComplete="none"
                  ></Form.Control>
                </Form.Group>
              )}
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              typeof customDataUpdate[key] === "string" &&
              customDataUpdate[key].length <= 10 &&
              !moment(customDataUpdate[key], "YYYY-MM-DD", true).isValid() && (
                <Form.Group className="rounded-lg border-yellow-500 border-2 p-4">
                  <Form.Label>
                    <strong>{key}</strong>
                  </Form.Label>
                  <br></br>
                  <Form.Control
                    className="px-2 py-2 rounded-lg border-yellow-500 border-2 p-4"
                    type="Text"
                    placeholder={`Enter ${key}`}
                    value={customDataUpdate[key]}
                    readOnly
                    autoComplete="none"
                  ></Form.Control>
                </Form.Group>
              )}
            {key !== "_id" &&
              key !== "__v" &&
              key !== "createdAt" &&
              typeof customDataUpdate[key] === "string" &&
              customDataUpdate[key].length > 10 &&
              !moment(customDataUpdate[key], "YYYY-MM-DD", true).isValid() && (
                <Form.Group className="rounded-lg border-yellow-500 border-2 p-4">
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
                    readOnly
                    autoComplete="none"
                  ></Form.Control>
                </Form.Group>
              )}
          </div>
        ))}
      </Form>
    </div>
  );
};

export default ViewUserForm;
