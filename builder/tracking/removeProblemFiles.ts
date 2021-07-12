/*
    For some reason, the [chelsea.zip] folder in the [imageio] Python package
    causes the Squirrel [{appname} Setup.exe] installer to crash when packaged using
    "electron-forge make" [Making for target: squirrel - On platform: win32 - For arch: x64]

    It's just a picture of a cat in a folder. The issue seems to be with the way 
    that the .zip folder was created.

    Same thing for [motorcycle_disp.npz] file in the [skimage] Python package.
    
    Things that cause it to crash still:
    - renaming it from [chelsea.zip] to [chelsea1.zip]
    - changing the contents from [chelsea.png] to [newtonscraddle.png]
    - moving [chelsea.zip] to the top level of the [dist] folder

    Things that fix the crash:
    - extracting [chelsea.png] into [chelsea] folder, then removing [chelsea.zip]
    - re-zipping [chelsea.png] into [chelsea.zip] using Windows File Explorer
    - removing all contents from [chelsea.zip] but still including the empty [chelsea.zip] folder
*/
import fse from "fs-extra";
import path from "path";

import { tracking } from "../paths";

const imageioChelseaPath = path.join(
  "imageio",
  "resources",
  "images",
  "chelsea.zip"
);

const skimageMotorcyclePath = path.join(
  "skimage",
  "data",
  "motorcycle_disp.npz"
);

const baseDir = path.join(tracking.distPath, tracking.name);
const motorcyclePath = path.join(baseDir, skimageMotorcyclePath);
const chelseaPath = path.join(baseDir, imageioChelseaPath);

async function removeProblemFiles() {
  // @ts-ignore
  fse.removeSync(motorcyclePath, { force: true });
  // @ts-ignore
  fse.removeSync(chelseaPath, { recursive: true, force: true });
}

module.exports = {
  removeProblemFiles,
};
