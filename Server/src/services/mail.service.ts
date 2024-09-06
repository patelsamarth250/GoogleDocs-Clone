import Mail from "nodemailer/lib/mailer";
import transporter from "../config/smtp.config";

// create a class that will help us to send messages to the users
class MailService {
  public sendMail = async (mailOptions: Mail.Options) => {
    transporter.sendMail(mailOptions);
  };
}

const mailservice = new MailService();

export { mailservice };