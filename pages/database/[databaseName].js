import { BiEdit, BiArrowBack } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDatabaseDash } from "react-icons/bs";
import { BiX, BiCheck } from "react-icons/bi";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  databseGetAction,
  dbAllDataGetAction,
  dbDataDelAction,
  dbDataGetAction,
} from "@/frontend/redux/actions/databaseActions";
import {
  DATABASE_GET_RESET,
  DB_ALL_DATA_GET_RESET,
  DB_DATA_CREATE_RESET,
  DB_DATA_DELETE_RESET,
  DB_DATA_GET_RESET,
  DB_DATA_UPDATE_RESET,
} from "@/frontend/redux/constants/databaseConstants";
import AddDBDataForm from "@/frontend/components/AddDBDataForm";
import UpdateDBDataForm from "@/frontend/components/UpdateDBDataForm";

const EmpInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  let dbName = router.query.databaseName;
  const [allowEmployeeGet, setEmployeeGet] = useState(false);
  const [visisbleUpModelData, setVisibleUpModelData] = useState(false);
  const [visibleAddNewModelData, setVisibleAddNewModelData] = useState(false);
  const [deleteModelDataId, setDeleteModelDataId] = useState("");
  const [updateModelDataId, setUpdateModelDataId] = useState("");

  const [dbSchema, setDbSchema] = useState({});
  const [schemaFromFile, setSchemaFromFile] = useState({});

  const databaseGet = useSelector((state) => state.databaseGet);
  const {
    loading: loadingdatabaseget,
    error: errordatabaseget,
    databaseget,
  } = databaseGet;
  const dbAllDataGet = useSelector((state) => state.dbAllDataGet);
  const {
    loading: loadingdballdataget,
    error: errordballdataget,
    dballdataget,
  } = dbAllDataGet;
  const dbDataGet = useSelector((state) => state.dbDataGet);
  const {
    loading: loadingdbdataget,
    error: errordbdataget,
    dbdataget,
  } = dbDataGet;
  const dbDataCreate = useSelector((state) => state.dbDataCreate);
  const {
    loading: loadingdbdatacreate,
    success: successdbdatacreate,
    error: errordbdatacreate,
    dbdatacreate,
  } = dbDataCreate;
  const dbDataDel = useSelector((state) => state.dbDataDel);
  const {
    loading: loadingdbdatadelete,
    success: successdbdatadelete,
    error: errordbdatadelete,
    dbdatadelete,
  } = dbDataDel;
  const dbDataUpdate = useSelector((state) => state.dbDataUpdate);
  const {
    loading: loadingdbdataupdate,
    success: successdbdataupdate,
    error: errordbdataupdate,
    dbdataupdate,
  } = dbDataUpdate;
  useEffect(() => {
    if (!databaseget && dbName && !allowEmployeeGet) {
      dispatch(databseGetAction(dbName));
    }
    if (!dballdataget && dbName && !allowEmployeeGet) {
      dispatch(dbAllDataGetAction(dbName));
    }
    if (successdbdatacreate) {
      dispatch({ type: DB_DATA_CREATE_RESET });
      dispatch({ type: DB_ALL_DATA_GET_RESET });
    }
    if (successdbdatadelete) {
      dispatch({ type: DB_DATA_DELETE_RESET });
      dispatch({ type: DB_ALL_DATA_GET_RESET });
    }
    if (successdbdataupdate) {
      setUpdateModelDataId("");
      dispatch({ type: DB_DATA_UPDATE_RESET });
      dispatch({ type: DB_DATA_GET_RESET });
      dispatch({ type: DB_ALL_DATA_GET_RESET });
    }
    if (databaseget) {
      const tempSchema = {};
      const tempSchemaFromFile = {};
      const schemaPaths = databaseget.schema || "";
      const schemaFromFilePaths = databaseget.schemaFromStoredFile || "";
      if (schemaPaths) {
        Object.keys(databaseget.schema.paths).forEach(
          (key) => (tempSchema[key] = databaseget.schema.paths[key].instance)
        );
        delete tempSchema.__v;
        delete tempSchema._id;
      }
      if (schemaFromFilePaths) {
        Object.keys(schemaFromFilePaths).forEach(
          (key) => (tempSchemaFromFile[key] = schemaFromFilePaths[key])
        );
      }
      setDbSchema(tempSchema);
      setSchemaFromFile(tempSchemaFromFile);
    }
  }, [
    dispatch,
    databaseget,
    dbName,
    allowEmployeeGet,
    dballdataget,
    successdbdatacreate,
    successdbdatadelete,
    successdbdataupdate,
  ]);

  const viewUpdateDBDatahandler = (dataId) => {
    if (!updateModelDataId) {
      setUpdateModelDataId(dataId);
    } else {
      setUpdateModelDataId("");
    }
    if (dbName && dataId && updateModelDataId) {
      dispatch({ type: DB_DATA_GET_RESET });
    } else {
      dispatch(dbDataGetAction(dbName, dataId));
    }
    if (!visibleAddNewModelData || !updateModelDataId) {
      setVisibleUpModelData(!visisbleUpModelData);
    } else {
      toast.error("Add New Project Data in Progress...");
    }
  };

  const addNewModelDatahandler = () => {
    if (!visisbleUpModelData) {
      setVisibleAddNewModelData(!visibleAddNewModelData);
    } else {
      toast.error("Update Action in Progress...");
    }
  };
  const deleteDBDatahandler = (dataId) => {
    setDeleteModelDataId(dataId);
  };
  const backButtonHandler = () => {
    dbName = "";
    setEmployeeGet(true);
    dispatch({ type: DATABASE_GET_RESET });
    dispatch({ type: DB_ALL_DATA_GET_RESET });
  };
  const deletehandler = () => {
    const model = {
      dbDataId: deleteModelDataId,
    };
    if (deleteModelDataId && dbName) {
      dispatch(dbDataDelAction(dbName, model));
      setDeleteModelDataId("");
    }
  };

  const cancelhandler = () => {
    setDeleteModelDataId("");
  };
  // console.log(
  //   dbdataget,
  //   visisbleUpModelData,
  //   updateModelDataId,
  //   dbSchema,
  //   dbName
  // );
  return (
    <>
      <section>
        <Head>
          <title>{dbName} Info Page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>
        <ToastContainer position="bottom-right" />
        <main className="py-5">
          <div className="container mx-auto flex justify-between py-5 border-b">
            <Link href="/">
              <button
                onClick={backButtonHandler}
                className="flex bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
              >
                <span className="px-1">
                  <BiArrowBack size={23}></BiArrowBack>
                </span>
                Go Back{" "}
              </button>
            </Link>
            <h1 className="text-xl md:text-5xl text-center font-bold">
              {dbName} DB Info
            </h1>
          </div>
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="right flex gap-3">
              <button
                onClick={addNewModelDatahandler}
                className="flex bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
              >
                Add new {dbName} data{" "}
                <span className="px-1">
                  <BiEdit size={23}></BiEdit>
                </span>
              </button>
            </div>
          </div>
          {/* collapsable form */}
          {dbdataget &&
          visisbleUpModelData &&
          updateModelDataId &&
          dbSchema &&
          dbName ? (
            <div className="container mx-auto py-5 border-b">
              <h1 className="text-xl md:text-3xl text-center font-bold">
                Data Update Form
              </h1>
              <br></br>
              <UpdateDBDataForm
                updateModelDataId={updateModelDataId}
                dbData={dbdataget.result}
                schemaFromFile={schemaFromFile}
                dbName={dbName}
                dbSchema={dbSchema}
                visisbleUpModelData={visisbleUpModelData}
                setVisibleUpModelData={setVisibleUpModelData}
              />
            </div>
          ) : (
            <></>
          )}
          {/* collapsable form */}
          {visibleAddNewModelData && dbSchema && dbName ? (
            <div className="container mx-auto py-5 border-b">
              <h1 className="text-xl md:text-3xl text-center font-bold">
                Add Data Form
              </h1>
              <br></br>
              <AddDBDataForm
                schemaFromFile={schemaFromFile}
                dbName={dbName}
                dbSchema={dbSchema}
                visibleAddNewModelData={visibleAddNewModelData}
                setVisibleAddNewModelData={setVisibleAddNewModelData}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="container mx-auto border-t">
            <div className="container mx-auto flex justify-between py-5 border-b">
              <div className="bg-yellow-300 p-4 rounded-md shadow-md">
                <h6 className="text-xl pt-2 pr-8 font-bold">Database Name</h6>
                <span>{dbName}</span>
                <h6 className="text-xl pt-2 pr-8 font-bold">Database Schema</h6>
                {dbSchema &&
                  Object.keys(dbSchema).map((key, index) => (
                    <div key={index}>
                      <span>
                        {key} - {dbSchema[key]}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="container mx-auto py-5 border-b">
            <div className="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dballdataget ? (
                dballdataget.result.map((data) => (
                  <div
                    key={data._id}
                    className="bg-white p-4 rounded-md shadow-md"
                  >
                    <div className="flex justify-between">
                      <div className="p-2 text-justify">
                        {deleteModelDataId === data._id ? (
                          DeleteComponent({ deletehandler, cancelhandler })
                        ) : (
                          <></>
                        )}
                        <h6 className="text-xl font-bold">Database Name</h6>
                        <span>{dbName}</span>
                        <br></br>
                        <h6 className="text-xl font-bold">Database Data</h6>
                        <span>
                          <strong>UID</strong> - {data._id}
                        </span>
                        {Object.keys(data).map((key, index) => (
                          <span key={index}>
                            {key !== "_id" && key !== "__v" && (
                              <>
                                <br></br>
                                <strong>{key}</strong> - {data[key]}
                              </>
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => viewUpdateDBDatahandler(data._id)}
                          className="my-2 flex bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-yellow-500 hover:text-gray-800"
                        >
                          <span className="px-1">
                            <AiOutlineEdit size={23}></AiOutlineEdit>
                          </span>
                        </button>
                        <button
                          onClick={() => deleteDBDatahandler(data._id)}
                          className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-red-500 hover:text-gray-800"
                        >
                          <span className="px-1">
                            <BsDatabaseDash size={23}></BsDatabaseDash>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

function DeleteComponent({ deletehandler, cancelhandler }) {
  return (
    <div className="flex gap-5">
      <button>Are you sure?</button>
      <button
        onClick={deletehandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes{" "}
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button
        onClick={cancelhandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
      >
        No{" "}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
    </div>
  );
}

export default EmpInfo;
