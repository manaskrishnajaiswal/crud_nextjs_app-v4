import connectMongo from "@/backend/config/database/conn";
import {
  createDBData,
  deleteDBData,
  getDBData,
} from "@/backend/controllers/modelsDataController";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/modelApi/modelsData/[modeName] -> get all data from db
      await getDBData(req, res);
      break;
    case "POST":
      // POST /api/modelApi/modelsData/[modeName] -> create data of a DB
      await createDBData(req, res);
      break;
    case "DELETE":
      // DEL /api/modelApi/modelsData/[modeName] -> delete a model data from a database
      await deleteDBData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
