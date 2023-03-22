// handle model name
export function handleModelName(modelname) {
  let modelName = modelname.toLowerCase();
  let modelNameSpread = [...modelName];
  let lastChar = modelNameSpread.slice(-1)[0];
  let secLastChar = modelNameSpread.slice(-2)[0];
  if (secLastChar === "s" && lastChar === "s") {
    modelName = modelName.concat("es");
  } else if (lastChar === "s") {
    modelName = modelName;
  } else if (lastChar !== "s") {
    modelName = modelName.concat("s");
  } else {
    modelName = "";
  }
  return modelName;
}
