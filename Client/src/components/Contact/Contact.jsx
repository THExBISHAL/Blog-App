import { API } from "@/service/api";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await API.contact(formData);
    if (response.isSuccess) {
      setSubmitted(true);
      toast(response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Contact Me
        </h1>

        {submitted ? (
          <div className="text-green-600 font-medium text-center">
            Thank you for reaching out! I'll get back to you soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action="https://formsubmit.co/iambishalchakraborty1304@gmail.com"
            method="POST"
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Social Media Section */}
        <div className="mt-10 border-t pt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Connect with me
          </h2>
          <div className="flex justify-center space-x-6 text-gray-600 text-2xl">
            <a
              href="https://github.com/THExBISHAL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/bishal-chakraborty-6081342a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/THExBISHAL?t=LIfKIkUBIq1k0BosWAq4-w&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/thebishalchakraborty/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
