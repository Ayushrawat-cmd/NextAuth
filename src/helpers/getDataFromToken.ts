import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function getDataFromToken(request:NextRequest) {
    try{
        const token = request.cookies.get("token")?.value || '';
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        // console.log(decodeToken.id);
        return decodeToken.id;
    }
    catch(error){
        throw new Error("Token not found");
    }
}