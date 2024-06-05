"use client";

import React, { useState } from "react";
import {useRouter } from "next/navigation";
import Link from "next/link";
import { styles } from "./style";
import { Lato } from "next/font/google";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "auto",
});

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
});

function SignupForm() {
  //-----------------~Fields~------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //--------------~for handling error message~--------------
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  //--------------~for handling validation~--------------
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [isAtLeastEightChars, setIsAtLeastEightChars] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  //--------------~for routing to verificaion page~--------------
  const router = useRouter();

  //---------------------HANDLERS-------------------------
  const validateUsernameHandler = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);

    if (newUsername.trim().length === 0) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }
  };

  const validateEmailHandler = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newEmail.trim().length === 0) {
      setEmailError("Please provide an email.");
      setEmailValid(false);
    } else if (!re.test(String(newEmail).toLowerCase())) {
      setEmailError("Please enter an valid email.");
      setEmailValid(false);
    } else {
      setEmailError("");
      setEmailValid(true);
    }
  };

  const validatePasswordHandler = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    setHasNumber(/\d/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    setHasUppercase(/[A-Z]/.test(newPassword));
    setHasLowercase(/[a-z]/.test(newPassword));
    setIsAtLeastEightChars(newPassword.length >= 8);
  };

  const validateConfirmPasswordHandler = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsPasswordMatched(password === newConfirmPassword);

    if (
      hasNumber &&
      hasSpecialChar &&
      hasUppercase &&
      hasLowercase &&
      isAtLeastEightChars &&
      password === newConfirmPassword
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // ---------------------handleSubmitForm---------------------
  const submitHandler = async (event) => {
    event.preventDefault();

    if (usernameValid && emailValid && passwordValid) {
      console.log("--submit form--");
      console.log(
        "name:",
        usernameValid,
        ",email:",
        emailValid,
        ",pw:",
        passwordValid
      );

      const nameAttribute = new CognitoUserAttribute({
        Name: "name",
        Value: username,
      });

      const emailAttribute = new CognitoUserAttribute({
        Name: "email",
        Value: email,
      });

      const attributes = [nameAttribute, emailAttribute];

      try {
        const result = userPool.signUp(email, password, attributes, null);
        router.push("/account/verification");
      } catch (e) {
        setError("Signup failed. Error: " + e.message);
        console.log("Signup fail. Error:", e);
      }
    }
  };

  //-----handleGoogleLogin-----
  const googleSignInHandler = async (event) => {
    try {
      await signIn("cognito", {
        callbackUrl: "http://localhost:3000/account/login",
      });
      console.log("Google sign-in call was made");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  //------------------------------------

  return (
    <>
      <Nav />
      <section
        className={`${styles.section} flex flex-col sm:flex-row justify-center items-center`}
      >
        <div className={`w-full sm:w-[400px] pr-20 ${lato.className}`}>
          {/* ------------------------------INTRO----------------------------- */}
          <h2 className="text-4xl text-teal-700 mt-4 mb-4">Welcome!</h2>
          <p className="block text-teal-600 mb-4">
            Today is a new day. It's your day. Sign up to make the kids a step
            closer to their dream.
          </p>

          {/* ------------------------------FORM----------------------------- */}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-4"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={validateUsernameHandler}
                placeholder="Username"
                className="mt-1 block w-full p-2 border-2 border-black rounded-xl"
              />
            </div>

            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-4"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={validateEmailHandler}
                placeholder="Example@email.com"
                className="mt-1 block w-full p-2 border-2 border-black rounded-xl"
              />
              {!emailValid && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={validatePasswordHandler}
                placeholder="Enter your password"
                className="mt-1 block w-full p-2 border-2 border-black rounded-xl"
              />

              <label
                className="block text-sm font-bold text-gray-700 mb-2 mt-4"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={validateConfirmPasswordHandler}
                placeholder="Re-type your password"
                className="mt-1 block w-full p-2 border-2 border-black rounded-xl"
              />

              <div className="mt-2">
                <p
                  className={`text-sm ${
                    isAtLeastEightChars ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {isAtLeastEightChars && (
                    <span className="text-green-500">✓</span>
                  )}{" "}
                  At least 8 characters long
                </p>
                <p
                  className={`text-sm ${
                    hasNumber ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {hasNumber && <span className="text-green-500">✓</span>}{" "}
                  Contains at least 1 number
                </p>
                <p
                  className={`text-sm ${
                    hasSpecialChar ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {hasSpecialChar && <span className="text-green-500">✓</span>}{" "}
                  Contains at least 1 special character
                </p>
                <p
                  className={`text-sm ${
                    hasUppercase ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {hasUppercase && <span className="text-green-500">✓</span>}{" "}
                  Contains at least 1 uppercase letter
                </p>
                <p
                  className={`text-sm ${
                    hasLowercase ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {hasLowercase && <span className="text-green-500">✓</span>}{" "}
                  Contains at least 1 lowercase letter
                </p>
                <p
                  className={`text-sm ${
                    isPasswordMatched ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {isPasswordMatched && (
                    <span className="text-green-500">✓</span>
                  )}{" "}
                  Passwords must match
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                {error && <div className="text-red-500 text-xs">{error}</div>}
              </div>
              <div>
                <Link
                  href="/account/forgot-password"
                  className="text-xs text-grey-600 hover:font-bold"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              className={`w-full text-white py-2 rounded-xl ${
                username && emailValid && passwordValid
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-gray-500"
              }`}
              type="submit"
              id="submitBtn"
              disable={username && emailValid && passwordValid}
            >
              Sign up
            </button>
          </form>

          <div className="mt-8 mb-8 flex items-center justify-between">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-2 text-gray-500">Or</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <div className="mt-4 flex flex-col space-y-2">
            <button
              className="flex items-center justify-center w-full bg-white text-gray-600 border-gray-300 py-2 rounded-xl mb-2 hover:bg-teal-600 hover:text-white"
              onClick={googleSignInHandler}
            >
              <img
                className="w-6 h-6 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google logo"
              />
              Sign up with Google
            </button>
          </div>

          <p className="mt-6 mb-6 text-center text-gray-500">
            Already have an account?
            <Link href="/account/login" className=" ml-1 font-bold text-teal-600 hover:text-teal-500">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="w-full sm:sm:w-[550px] sm:h-[755px]">
          <img
            src="/images/signin.jpeg"
            alt="Login Image"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default SignupForm;
