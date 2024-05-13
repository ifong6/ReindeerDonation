"use client";

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
});


function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // Extracting the role from query parameters
    
  // -----handleSubmitForm-----
  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameAttribute = new CognitoUserAttribute({
      Name: "name",
      Value: name,
    });

    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    const attributes = [nameAttribute, emailAttribute];

    try {
      const result = await userPool.signUp(email, password, attributes, null);
      setSuccess(
        "Signup successful. Check your email to confirm registration."
      );
      setVerificationSent(true);
      console.log("Signup success. Result:", result);
    } catch (e) {
      setError("Signup failed. Error: " + e.message);
      console.log("Signup fail. Error:", e);
    }
  };
  //------------------------------------

  // -----handleConfirmVerification-----
  const handleConfirmVerification = async (event) => {
    event.preventDefault();

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    try {
      const result = await cognitoUser.confirmRegistration(code, true);
      console.log("Confirmation success:", result);
      setSuccess("Your account has been confirmed!");
      setVerificationSent(false);
    } catch (e) {
      setError("Confirmation failed. Error: " + e.message);
      console.log("Confirmation fail. Error:", e);
    }
  };
  //------------------------------------

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} class="space-y-6">
        <h2>Signing up as {role}</h2>

        <label htmlFor="name" class="block text-sm font-medium text-gray-700">
          Username:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-5/6 px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label htmlFor="email" class="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-5/6 px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label
          htmlFor="password"
          class="block text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-5/6 px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />

        <button
          type="submit"
          className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          Submit
        </button>
      </form>

      {success && verificationSent && (
        <form onSubmit={handleConfirmVerification}>
          <label htmlFor="code">Confirmation Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-slate-200 m-2"
          />
          <button type="submit">Confirm Account</button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default SignupForm;
