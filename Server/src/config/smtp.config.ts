import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "satyampundir03@gmail.com",
    pass: "vrbc nvam ckvb vsds",
  },
  secure: true,
});

export default transporter;