"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import * as React from "react";

export default function SignupPage() {
    const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtondDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    )
      setButtondDisabled(false);
    else setButtondDisabled(true);
  }, [user]);

  const onSignUp = async () => {
    try{
        setLoading(true);
        console.log(user);
        const response = await axios.post('/api/users/signup',user);
        console.log(response.data);
        router.push('/login');
    }
    catch(error:any){
        console.log(error);
    }
    finally{
        setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{loading && "Processing" || "Signup"}</h1>
      <hr />
      <label htmlFor="Username">Username</label>
      <input
        className="text-black p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="username"
      ></input>
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
      <button
        onClick={onSignUp}
        className="p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
