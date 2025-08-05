import Contact from "../models/contact.js";

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const submittedAt = formatDate();

    const contact = new Contact({ name, email, message, submittedAt });
    await contact.save();

    return res.status(200).json({
      message: "Contact send successfully",
      contact,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error while sending contact",
      error: e.message,
    });
  }
};

function formatDate() {
  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${month} ${getOrdinal(day)} ${year}, ${pad(hour12)}:${pad(
    minutes
  )}:${pad(seconds)} ${ampm}`;
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function getOrdinal(n) {
  if (n >= 11 && n <= 13) return n + "th";
  switch (n % 10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
    default:
      return n + "th";
  }
}
