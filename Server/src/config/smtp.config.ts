import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "patelsamarth000@gmail.com",
    pass: "ctif kcsq ahsu bpve",
  },
  secure: true,
});

export default transporter;