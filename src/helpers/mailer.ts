import nodemailer from "nodemailer";
import User from "@/model/user";
import bcryptjs from "bcryptjs";

type Email = {
  email: string;
  emailType: string;
  userId: string;
};
export const sendEmail = async ({ email, emailType, userId }: Email) => {
  try {
    const hashedToken = await bcryptjs.hash(userId, 10);
    const userData = await User.findById(userId);
    if (emailType === "VERIFY") {
      userData.verifyToken = hashedToken;
      userData.verifyTokenExpiry = Date.now() + 3600000;
      await userData.save();
    } else if(emailType === "RESET") {
      userData.forgotPasswordToken = hashedToken;
      userData.forgotPasswordTokenExpiry = Date.now() + 3600000;
      await userData.save();
    }
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'ayushrawat324@gmail.com',
          // api_key:'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'
          pass:'zvxuqkfskstfoexl'
      
        }
      });
      const mailres = await transporter.sendMail({
        from:'ayushrawat324@gmail.com',
        to:email,
        subject:emailType === "VERIFY"?"Verify your email":"Reset your password",
        html:`<p>Click <a href="${process.env.domain}/${emailType === "VERIFY"?"verifyemail":"resetpassword"}/?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"Verify your email":"Reset your password"}</p>`
      });
      return mailres;
  } catch (error) {
    throw new Error("NOt sent");
  }
};
