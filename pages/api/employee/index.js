import connectMongo from "@/backend/config/database/conn";
import {
  getEmployeesData,
  postEmployeeData,
} from "@/backend/controllers/employeeController";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/employee -> Get all employee in the company
      await getEmployeesData(req, res);
      break;
    case "POST":
      // POST /api/employee -> Post/add employee in the company
      await postEmployeeData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
