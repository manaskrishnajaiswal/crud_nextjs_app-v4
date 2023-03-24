import connectMongo from "@/backend/config/database/conn";
import {
  getDBData,
  putDBData,
} from "@/backend/controllers/modelsDataController";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/modelApi/modelsData/[modeName]/[modelData] -> get individual model data from db
      await getDBData(req, res);
      break;
    case "PUT":
      // PUT /api/employee/EmpId -> update data of a employee
      await putDBData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
