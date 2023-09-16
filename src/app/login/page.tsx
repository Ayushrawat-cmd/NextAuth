"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

// import * as React from "react";

export default function LoginPage() {
    const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtondDisabled] = useState(false);
  const onLogin = async () => {
    try{
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log(response.data);
        router.push('/profile');
    }
    catch(error:any){
        console.log(error);
    }
    finally{
        setLoading(false);
    }
  };
  useEffect(()=>{
    if(user.email.length>0 && user.email.length>0)
        setButtondDisabled(true);
    else
        setButtondDisabled(false);
  },[user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ?"Processing": "Login"}</h1>
      <hr />
      
      <label htmlFor="Email">Email</label>
      <input
        className="text-black p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      ></input>
      <label htmlFor="Password">Password</label>
      <input
        className="text-black p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      ></input>
      <button onClick={onLogin} className="p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ?"Login": "Not login"}</button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
