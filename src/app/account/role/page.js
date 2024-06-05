"use client";

import React from "react";
import Link from "next/link";

const RoleOptions = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-500">
      <h1 className="text-xl font-bold text-gray-700 mb-5">Pick an option</h1>
      <div className="flex flex-row space-x-4">
        {/* Care Agency Link */}
        <Link
          href={{ pathname: "/account/signup", query: { role: "Care Agency" } }}
          className="flex flex-col items-center justify-center w-50 h-44 bg-white-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          <img
            src="/images/care.png"
            alt="Care Agency Icon"
            className="w-48 h-24 m-3 rounded-lg"
          />
          <span className="text-gray-600 font-semibold">
            Sign up as Care Agency
          </span>
        </Link>

        {/* Recipient Link */}
        <Link
          href={{ pathname: "/account/signup", query: { role: "Recipient" } }}
          className="flex flex-col items-center justify-center w-50 h-44 bg-white-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
        >
          <img
            src="/images/children.jpeg"
            alt="Care Agency Icon"
            className="w-48 h-24 m-3 rounded-lg"
          />
          <span className="text-gray-600 font-semibold">
            Sign up as Recipient
          </span>
        </Link>

        {/* Donor Link */}
        <Link
          href={{ pathname: "/account/signup", query: { role: "Donor" } }}
          className="flex flex-col items-center justify-center w-50 h-44 bg-white-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
        >
          <img
            src="/images/donor.jpeg"
            alt="Care Agency Icon"
            className="w-48 h-24 m-3 rounded-lg"
          />
          <span className="text-gray-600 font-semibold">
            Sign up as a Donor
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RoleOptions;
