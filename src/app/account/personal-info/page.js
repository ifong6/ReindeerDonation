"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { styles } from "./style";

export default function PersonalInfo() {
  // useSession is a NextAuth's function
  const { data: session } = useSession(); // remove { required: true }
  const [file, setFile] = useState(null); // Default Image
  const defaultUrl =
    "https://s3.us-west-2.amazonaws.com/users.profileimage/avatar.png";
  const [url, setUrl] = useState(defaultUrl);

  useEffect(() => {
    const savedImageDataUrl = localStorage.getItem("savedImageDataUrl");
    if (savedImageDataUrl) {
      setUrl(savedImageDataUrl);
    }
  }, []);

  // Handler for file selection and image preview
  const handleImageChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
    }

    const url = event.target.files[0];
    if (url && url.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result);
        localStorage.setItem("savedImageDataUrl", reader.result);
      };
      reader.readAsDataURL(url);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload");

      const data = await response.json();
      const newUrl = data.imageUrl;
      setUrl(newUrl);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutHandler = async () => {
    await signOut({
      callbackUrl: "http://localhost:3000/account/login",
    });
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleImageUpload} className="flex-shrink-0">
          <div className="w-24 h-24 overflow-hidden rounded-full mb-3">
            <Image
              src={url}
              alt="Profile Image"
              layout="responsive"
              width={96}
              height={96}
              className="object-cover rounded-full"
            />
          </div>
          <label
            className="cursor-pointer bg-gray-200 text-white py-1 px-3 text-sm rounded"
            style={{ backgroundColor: "#d3d3d3", marginTop: "12px" }}
          >
            Change Image
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden" // Hide the actual file input
            />
          </label>
          {file && (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 text-sm rounded ml-2"
            >
              Confirm
            </button>
          )}
        </form>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold">Personal Info</h3>
          <p>Email: {session?.user?.email || "None"}</p>
          <p>Name: {session?.user?.name || "None"}</p>
          <button onClick={signOutHandler} className={styles.buttonSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
