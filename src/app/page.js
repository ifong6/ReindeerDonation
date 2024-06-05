"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { styles } from "./style";


function Home() {
  const { data: session } = useSession();

  //"text-3xl stfont-bold tracking-wide"
  return (
    <div className={styles.container}>
      <h6 className={styles.title}>
        <span className="text-red-500">R</span>
        <span className="text-orange-400">e</span>
        <span className="text-yellow-400">i</span>
        <span className="text-green-500">n</span>
        <span className="text-teal-400">d</span>
        <span className="text-blue-500">e</span>
        <span className="text-indigo-500">e</span>
        <span className="text-purple-500">r</span>
        <span className="text-pink-500"> F</span>
        <span className="text-red-500">o</span>
        <span className="text-orange-400">r</span>
        <span className="text-yellow-400">e</span>
        <span className="text-green-500">v</span>
        <span className="text-teal-400">e</span>
        <span className="text-blue-500">r</span>
        <span className="text-indigo-500"> G</span>
        <span className="text-purple-500">i</span>
        <span className="text-pink-500">f</span>
        <span className="text-red-500">t</span>
        <span className="text-orange-400">s</span>
      </h6>

       <img
        src="/images/image2.webp"
        className={styles.image}
      />

      <div className={styles.spaceBetween}>
        <Link href="/account/signup">
          <button className={styles.button}>Sign up</button>
        </Link>
        <Link href="/account/login">
          <button className={styles.buttonSecondary}>Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
