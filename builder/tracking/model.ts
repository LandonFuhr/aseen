import fse from "fs-extra";
import path from "path";
import YAML from "yaml";
import { tracking } from "../paths";

function buildDlcProject({
  srcProjectPath,
  outProjectPath,
}: {
  srcProjectPath: string;
  outProjectPath: string;
}) {
  if (fse.existsSync(outProjectPath)) {
    fse.removeSync(outProjectPath);
  }
  fse.copySync(srcProjectPath, outProjectPath);
  removeUnusedFolders({ outProjectPath });
  cleanConfigYaml({ outProjectPath });
  cleanTrainingPoseConfig({ outProjectPath });
}

function removeUnusedFolders({ outProjectPath }: { outProjectPath: string }) {
  const items = fse.readdirSync(outProjectPath);
  for (const item of items) {
    const itemPath = path.join(outProjectPath, item);
    const stats = fse.statSync(itemPath);
    if (stats.isDirectory() && item !== "dlc-models") {
      fse.removeSync(itemPath);
    }
  }
}

function cleanConfigYaml({ outProjectPath }: { outProjectPath: string }) {
  const keysToKeep = new Set([
    "Task",
    "date",
    "multianimalproject",
    "individuals",
    "uniquebodyparts",
    "multianimalbodyparts",
    "skeleton",
    "bodyparts",
    "TrainingFraction",
    "iteration",
    "snapshotindex",
    "cropping",
  ]);
  const configYamlPath = path.join(outProjectPath, "config.yaml");
  const configStr = fse.readFileSync(configYamlPath).toString();
  const config = YAML.parse(configStr);
  for (const key of Object.keys(config)) {
    if (!keysToKeep.has(key)) {
      delete config[key];
    }
  }
  config["project_path"] = null;
  fse.writeFileSync(configYamlPath, YAML.stringify(config));
}

function cleanTrainingPoseConfig({
  outProjectPath,
}: {
  outProjectPath: string;
}) {
  const keysToKeep = new Set(["net_type"]);
  const poseConfigPath = getTrainPoseConfigPath({ outProjectPath });
  const poseConfigFile = fse.readFileSync(poseConfigPath).toString();
  const poseConfig = YAML.parse(poseConfigFile);
  for (const key of Object.keys(poseConfig)) {
    if (!keysToKeep.has(key)) {
      delete poseConfig[key];
    }
  }
  fse.writeFileSync(poseConfigPath, YAML.stringify(poseConfig));
}

function getTrainPoseConfigPath({
  outProjectPath,
}: {
  outProjectPath: string;
}) {
  const modelPath = getModelFolderPath({ outProjectPath });
  return path.join(modelPath, "train", "pose_cfg.yaml");
}

function getModelFolderPath({ outProjectPath }: { outProjectPath: string }) {
  const modelsPath = path.join(outProjectPath, "dlc-models");
  const iterations = fse.readdirSync(modelsPath);
  const iterationName = iterations[iterations.length - 1];
  const models = fse.readdirSync(path.join(modelsPath, iterationName));
  const modelName = models[models.length - 1];
  return path.join(modelsPath, iterationName, modelName);
}

buildDlcProject({
  srcProjectPath: "",
  outProjectPath: tracking.dlc.dst,
});
