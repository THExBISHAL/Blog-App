import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("contact", contactSchema);
export default Contact;
