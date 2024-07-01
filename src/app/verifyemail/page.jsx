"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null); // Initialize error as null

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/verifyemail', { token });
      setVerified(true);
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl">Please Verify Your Email</h1>

      <button onClick={verifyUserEmail} className="btn btn-verify p-2 bg-primary rounded-md my-4">
       {token ? "Verify Email"   : "No Token"}
      </button>

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
          <h2 className="text-xl text-red-500">Error: {error}</h2>
        </div>
      )}
    </div>
  );
}