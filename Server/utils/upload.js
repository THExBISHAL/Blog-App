import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dknwktwbt",
  api_key: "726431198278981",
  api_secret: "RPnCFqGqHO3uSmlkBCe8xdRkRAw",
});
const storage = new multer.memoryStorage();
export const imageUploadUtil = async (file) => {
  return await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
};
const upload = multer({ storage });

export default upload;
