import {connect} from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request:NextRequest) {
    try{
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: Object(userId)}).select("-password");
        // console.log(user);
        return NextResponse.json({message:'User found', data:user});
    }
    catch(error:any){
        NextResponse.json({error:error.message}, {status:402});
    }
}