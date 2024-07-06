"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null); // Initialize error as null

  const router = useRouter();

//   const verifyUserEmail = () => {
//     axios.post('/api/verifyemail', { token })
//         .then(() => {
//             setVerified(true);
//             router.push('/'); // navigate to home page
//         })
//         .catch((error) => {
//             setError(true);
//             console.log(error);
//         });
// }


const verify = async () => {
  axios.post(`${process.env.DOMAIN}/api/verifyemail`, { token })
    .then(res => {
      console.log(res);

      if (res.status === 400) {
        showAlert('Error', 'User not signed up');
      } else if (res.status === 405) {
        showAlert('Error', 'Already verified');
      } else {
        showAlert('Success', 'Account verified successfully!');
        router.push('/');
      }
    })
  
};


const showAlert = (title, message) => {
  confirmAlert({
    customUI: ({ onClose }) => (
      <div className="w-80 p-4 flex flex-col gap-6 bg-white rounded-md border-2 shadow-md">
        <h1 className="font-medium">{title}</h1>
        <p className="my-4 text-lg font-medium">{message}</p>
        <button className="btn rounded-md px-4 py-2 hover:bg-primary-dark" onClick={onClose}>
          OK
        </button>
      </div>
    ),
    closeOnEscape: true,
    closeOnClickOutside: true,
    willUnmount: () => {}
  });
};


  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl">Please Verify Your Email</h1>

      <button onClick={verify} className="btn btn-verify p-2 bg-primary rounded-md my-4">
       {token ? "Verify Email"   : "No Token"}
      </button>

    </div>
  );
}