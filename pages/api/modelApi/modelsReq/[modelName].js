import connectMongo from "@/backend/config/database/conn";
import {
  createDBData,
  deleteModel,
  getModel,
} from "@/backend/controllers/modelsReqController";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/modelApi/modelsReq/[modeName] -> find a model in a database
      await getModel(req, res);
      break;
    case "POST":
      // POST /api/modelApi/modelsReq/[modeName] -> create data of a DB
      await createDBData(req, res);
      break;
    case "DELETE":
      // DEL /api/modelApi/modelsReq/[modeName] -> delete a model from a database
      await deleteModel(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
