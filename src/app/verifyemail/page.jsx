"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/verifyemail', {token})
            setVerified(true);
        } catch (error) {
            setError(true);
            console.log(error);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-xl">Please Verify Your Email</h1>
            <h2 className="btn btn-verify p-2 bg-primary rounded-md my-4">{token ? `${token}` : "No Token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-xl mb-4">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-xl text-red-500">Error</h2>
                    
                </div>
            )}
        </div>
    )

}