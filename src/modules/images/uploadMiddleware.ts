import upload from "./multerConfig";

const uploadMiddleware = {
  uploadSingle: upload.single("photo"),
  uploadMultiple: upload.array("photos", 5),
};

export default uploadMiddleware;