import { imageUploadUtil } from "../utils/upload.js";

export const uploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

export const getImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await ImageModel.findById(imageId);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving image" });
  }
};
