import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { dbDataCreateAction } from "../redux/actions/databaseActions";

const AddDBDataForm = ({
  visibleAddNewModelData,
  setVisibleAddNewModelData,
  dbSchema,
  schemaFromFile,
  dbName,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addDBDataSubmit = (e) => {
    e.preventDefault();
    if (formData && dbName) {
      const model = {
        modelName: dbName,
        modelData: formData,
      };
      dispatch(dbDataCreateAction(model));
    }
    setVisibleAddNewModelData(!visibleAddNewModelData);
  };

  return (
    <form
      className="grid lg:grid-cols-2 w-4/6 gap-4"
      onSubmit={addDBDataSubmit}
    >
      {Object.keys(dbSchema).map((key, index) => (
        <div key={index} className="input-type">
          {(dbSchema[key] !== "String" || schemaFromFile[key] === "Text") && (
            <>
              <label>
                <strong>{key}</strong>
              </label>
              <input
                type={dbSchema[key] === "String" ? "text" : dbSchema[key]}
                value={formData[key] || ""}
                onChange={handleInputChange}
                name={key}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder={key}
                required
              />
            </>
          )}
          {dbSchema[key] === "String" && schemaFromFile[key] === "Textarea" && (
            <>
              <label>
                <strong>{key}</strong>
              </label>
              <br></br>
              <textarea
                style={{ resize: "none" }}
                rows={3}
                value={formData[key] || ""}
                onChange={handleInputChange}
                name={key}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder={key}
                required
              />
            </>
          )}
        </div>
      ))}
      <br></br>
      <button
        type="submit"
        className="max-h-10 flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
      >
        Add{" "}
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
};

export default AddDBDataForm;
