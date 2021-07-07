const fse = require("fs-extra");
const { tracking } = require("../paths");
const { runPyinstaller } = require("../pyinstaller");
const { removeProblemFiles } = require("./removeProblemFiles");

async function copyDlcProject() {
  fse.copy(tracking.dlc.src, tracking.dlc.dst);
}

const hiddenImportPackages = [
  "sklearn.utils._weight_vector",
  "statsmodels.tsa.statespace._filters",
  "statsmodels.tsa.statespace._filters._conventional",
  "statsmodels.tsa.statespace._filters._univariate",
  "statsmodels.tsa.statespace._filters._univariate_diffuse",
  "statsmodels.tsa.statespace._filters._inversions",
  "statsmodels.tsa.statespace._smoothers",
  "statsmodels.tsa.statespace._smoothers._alternative",
  "statsmodels.tsa.statespace._smoothers._classical",
  "statsmodels.tsa.statespace._smoothers._conventional",
  "statsmodels.tsa.statespace._smoothers._univariate_diffuse",
  "statsmodels.tsa.statespace._smoothers._univariate",
  "skimage.filters.rank.core_cy_3d",
];
const hiddenImports = [];
for (const hiddenPackage of hiddenImportPackages) {
  hiddenImports.push("--hidden-import");
  hiddenImports.push(hiddenPackage);
}

(async () => {
  await runPyinstaller(
    tracking.main,
    "--distpath",
    tracking.distPath,
    "--name",
    tracking.name,
    ...hiddenImports
  );
  await Promise.all([removeProblemFiles(), copyDlcProject()]);
})();
