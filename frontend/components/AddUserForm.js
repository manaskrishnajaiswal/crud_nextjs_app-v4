import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { employeeCreateAction } from "../redux/actions/employeeActions";

const AddUserForm = ({ visible, setVisiblehandler }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");

  const dispatch = useDispatch();

  const addEmployeehandleSubmit = (e) => {
    e.preventDefault();
    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email: email,
      salary: Number(salary),
      date: date,
      status: status ?? "Active",
    };
    dispatch(employeeCreateAction(model));
    setVisiblehandler(!visible);
  };

  return (
    <form
      className="grid lg:grid-cols-2 w-4/6 gap-4"
      onSubmit={addEmployeehandleSubmit}
    >
      <div className="input-type">
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
        />
      </div>
      <div className="input-type">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
          placeholder="Date"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={(e) => setStatus(e.target.value)}
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={(e) => setStatus(e.target.value)}
            value="InActive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
            Inactive
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
      >
        Add{" "}
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
};

export default AddUserForm;
