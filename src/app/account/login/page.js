"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { styles } from "./style";

export default function LoginPage() {
  // const [email, setEmail] = useState("569120411@qq.com");
  // const [password, setPassword] = useState("Reindeers123?");
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

    const signInHandler = async (event) => {
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
    <section
      className={`${styles.section} flex flex-col sm:flex-row justify-center items-center`}
    >
      <form
        onSubmit={submitHandler}
        className={`${styles.form} w-full sm:w-1/2`}
      >
        <div>
          <div>
            <h2 className={styles.pageHeader}>LOGIN</h2>
          </div>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={session?.user?.email || "None"}
            className={styles.input}
          />
        </div>
        <h4>Email: {session?.user?.email || "None"}</h4>
        <h4>Name: {session?.user?.name || "None"}</h4>
        <h4>Status: {status || "None"}</h4>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} type="submit">
          LOGIN
        </button>

        <div className="relative my-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <div className={styles.buttonGoogleDiv}>
          <button
            type="button"
            className={styles.buttonGoogle}
            onClick={signInHandler}
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
            />
            Log in with Google
          </button>
        </div>
      </form>

      <div className={styles.registerDiv}>
        <h2 className="text-2xl font-bold text-gray-800">FIRST TIME USER ?</h2>
        <p className="text-gray-600 my-2">It's free, and fast!</p>
        <Link href="/account/signup" className={styles.link}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.28 0-4 1.72-4 4v3h8v-3c0-2.28-1.72-4-4-4z"
            />
          </svg>
          REGISTER NOW
        </Link>
      </div>
    </section>
  );
}
