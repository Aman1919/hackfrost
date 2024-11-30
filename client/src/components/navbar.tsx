import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          ILE
        </h1>

        {/* Navigation Links */}
        {user && (
          <ul className="flex space-x-8 text-sm font-medium">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition-colors duration-200"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/allcourse")}
                className="hover:text-blue-500 transition-colors duration-200"
              >
                All Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/account")}
                className="hover:text-blue-500 transition-colors duration-200"
              >
                Account
              </button>
            </li>
          </ul>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!loading ? (
            user ? (
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Sign Up
                </button>
              </>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </nav>
    </header>
  );
}
