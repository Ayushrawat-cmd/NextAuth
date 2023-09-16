import mongoose from "mongoose";

export async function connect() {
    try{
        // console.log(process.env.MONGO_URL!)
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Connected to db");
            
        })
    }
    catch(error){
        console.log("something gone wrong", error);
    }
}