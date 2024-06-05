"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {

  
  return <>{children}</>;
}
