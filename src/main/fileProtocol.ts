import { protocol } from "electron";

export function registerFileProtocol() {
  protocol.registerFileProtocol("file", (req, cb) => {
    const filePath = req.url.replace("file:///", "");
    const decodedPath = decodeURI(filePath);
    cb(decodedPath);
  });
}
