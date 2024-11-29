import React from "react";

export default function NavBar() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          ILE
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-sm font-medium">
          <li>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              All Courses
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Account
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
