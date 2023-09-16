"use client"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        username:'',
        email:''
    });
    useEffect(()=>{
        const userData =async ()=>{
            const res = await axios.get('/api/users/me') ;
            setUserInfo(res.data.data);
            // console.log(data.data);
        } 
        userData();
    },[]);
    const onLogout = async ()=>{
        try{
            const res = await axios.get('/api/users/logout');
            console.log(res);
            router.push('/login');
        }
        catch(error:any){
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Profile { userInfo.username.length>0 ?userInfo.username:'Loading'}
            </h1>
            <hr/>
            <p>Profile page</p>
            <button onClick={onLogout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
        </div>
    )   
}