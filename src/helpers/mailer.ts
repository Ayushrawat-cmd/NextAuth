import nodemailer from "nodemailer";
import User from "@/model/user";
import bcryptjs from "bcryptjs";

type Email = {
    email:string,
    emailType: string,
    userId: string
}
export const sendEmail = async ({email, emailType, userId}:Email)=>{
    try{
        const hashedToken = await bcryptjs.hash(userId, 10);
        const userData = User.findById(userId)
    }
    catch(error){
        throw new Error("NOt sent");
    }
}
