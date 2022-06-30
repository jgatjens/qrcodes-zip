import JSZip from "jszip";
import QRCodeStyling from "qr-code-styling";
import config from "./config";

const canvasDOM = document.getElementById("canvas");
const button = document.getElementById("btn");

let zip = new JSZip();

const createZipFile = (svg: any) => {
  zip.file("file.svg", svg);
  zip.file("file-2.svg", svg);
};

async function saveFile(blobContent: any) {
  // create a new handle
  // @ts-ignore
  const newHandle = await window.showSaveFilePicker({
    suggestedName: "categoryId.zip",
  });
  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();
  // write our file
  await writableStream.write(blobContent);

  // close the file and write the contents to disk.
  await writableStream.close();
}

button?.addEventListener("click", () => {
  console.log("download file");
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveFile(content);
  });
});

// @ts-ignore
const qrCode = new QRCodeStyling(config);

if (canvasDOM) {
  qrCode.append(canvasDOM);
}

qrCode
  .getRawData("svg")
  .then(createZipFile)
  .catch((err) => console.log(err));
