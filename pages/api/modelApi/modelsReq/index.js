import connectMongo from "@/backend/config/database/conn";
import {
  createModel,
  getModels,
} from "@/backend/controllers/modelsReqController";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/modelApi/modelsReq -> get list of availble models in database
      await getModels(req, res);
      break;
    case "POST":
      // POST /api/modelApi/modelsReq -> create a model in the databse
      await createModel(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
