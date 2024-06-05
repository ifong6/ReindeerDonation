import React from "react";
import Link from "next/link";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "auto",
});

const Nav = () => {
  const aboutMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link href="/about">Our Story</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/team">How It Works</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="/team">Impact</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link href="/team">FAQs</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link href="/team">Volunteers</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link href="/team">Get Involved</Link>
      </Menu.Item>
    </Menu>
  );

  const helpMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link href="/donate">Donate Money</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/volunteer">Donate Items</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav
      className={`flex justify-between items-center p-5 border-b border-gray-300 ${lato.className}`}
    >
      <div className="flex items-center ml-20">
        <Link href="/">
          <img
            src="/images/reindeers.jpg"
            alt="Reindeers Logo"
            className="h-12 mr-5"
          />
        </Link>
        <Dropdown overlay={aboutMenu} trigger={["click"]} className="ml-5">
          <button className="flex items-center focus:outline-none hover:text-teal-600">
            About Us <DownOutlined className="ml-2" />
          </button>
        </Dropdown>
        <Dropdown overlay={helpMenu} trigger={["click"]} className="ml-5">
          <button className="flex items-center focus:outline-none hover:text-teal-600">
            Ways to Help <DownOutlined className="ml-2" />
          </button>
        </Dropdown>
        <Link href="/contact" className="ml-5 hover:text-teal-600">
          Contact Us
        </Link>
      </div>
      <div className="flex items-center mr-20 text-teal-600">
        <Link href="/account/signup" className="hover:text-teal-700">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
