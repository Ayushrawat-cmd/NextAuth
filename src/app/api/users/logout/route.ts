import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {connect} from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken"


export async function GET(request:NextRequest) {
    try{
        const response = NextResponse.json({
            message:"Logout successful",
            success: true
        });
        response.cookies.set("token","", {
            httpOnly:true,
            expires:new Date(0)
        });
        return response;
    }
    catch(error:any){
        NextResponse.json({error: error.message}, {status:500});
    }
}