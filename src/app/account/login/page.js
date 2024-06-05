"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { styles } from "./style";
import { Lato } from "next/font/google";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "auto",
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("Both email and password are required.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false, // Handling redirection manually
        //callbackUrl: "http://localhost:3000/account/personal-info",
      });
      if (result.error) {
        // Display the error message from the authentication process
        setError(result.error);
      }
    } catch (error) {
      return error;
    }
  };

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

  return (
    <>
      <Nav />
      <section
        className={`${styles.section} flex flex-col sm:flex-row justify-center items-center`}
      >
        <div className={`w-full sm:w-[400px] pr-20 ${lato.className}`}>
          <h2 className="text-4xl mb-6">Welcome Back!</h2>
          <p className="block text-gray-700 mb-4">
            Today is a new day. It's your day. Sign in to make the kids a step
            closer to their dream.
          </p>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-4"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@email.com"
                className="mt-1 block w-full p-2 border-2 border-black rounded-xl"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-4"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="mt-1 block w-full p-2 border-2 border-black rounded-xl"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>{error && <div className="text-red-500 text-xs">{error}</div>}</div>
              <div>
                <Link href="/account/forgot-password" className="text-xs text-grey-600">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              className="w-full bg-teal-600 text-white py-2 rounded-xl"
              type="submit"
            >
              Sign in
            </button>
          </form>

          <div className="mt-10 mb-10 flex items-center justify-between">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-2 text-gray-500">Or</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <div className="mt-4 flex flex-col space-y-2">
            <button
              className="flex items-center justify-center w-full bg-white border-gray-300 py-2 rounded-xl mb-2"
              onClick={googleSignInHandler}
            >
              <img
                className="w-6 h-6 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google logo"
              />
              Sign in with Google
            </button>
          </div>

          <p className="mt-10 text-center text-gray-500">
            Join us now!{" "}
            <Link href="/account/signup" className="text-teal-600">
              Create an account
            </Link>
          </p>
        </div>

        <div className="w-full sm:sm:w-[500px] sm:h-[725px]">
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
