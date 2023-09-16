import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {connect} from "@/dbconfig/dbconfig";

connect();

export async function POST(request:NextRequest) {
    try{
        // console.log(process.env.MONGO_URL);
        const reqBody = await request.json();
        const {username, email , password} = reqBody;
        // console.log(reqBody);
        const user = await User.findOne({email:email});
        if(user){
            return NextResponse.json({error: 'User already existed'}, {status:400});
        }
        //hash pw
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username, email, password:hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(newUser)
        return NextResponse.json({message: 'created user successfully', success:true, newUser});
    }
    catch(error:any){
        return NextResponse.json({error: error.message}, {status:500});
    }
}

export async function GET(request:NextRequest) {
    
}

export async function PUT(request:NextRequest) {
    
}

export async function DELETE(request:NextRequest) {
    
}