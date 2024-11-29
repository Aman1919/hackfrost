import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      } else {
        // Handle successful login (e.g., redirect or set user state)
        const data = await response.json();
        console.log("Login successful:", data);
        console.log(data);
        localStorage.setItem('token',data.token);
        window.localStorage.href = "/home";
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans max-w-4xl mx-auto flex items-center justify-center min-h-screen p-4">
      <div className="grid md:grid-cols-3 shadow-lg rounded-xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center space-y-8 bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-white">
          <div>
            <h4 className="text-lg font-semibold">Welcome Back!</h4>
            <p className="text-sm text-gray-300 mt-2">
              Please login to continue and access your account.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Secure Login</h4>
            <p className="text-sm text-gray-300 mt-2">
              Your privacy and security are our top priority.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form className="col-span-2 w-full bg-white p-6 sm:p-12" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Login</h3>
            <p className="text-sm text-gray-500 mt-2">
              Access your account by logging in below.
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm text-gray-800 block mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4"
                  />
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm text-gray-800 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10l9-7 9 7-9 7-9-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 mt-4">{error}</p>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
