import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import cookie from "cookie";
import { Cookies } from "@/types/cookie";
import jwt from "jsonwebtoken";
import Header from "../components/Header";

const URL = "http://localhost:3002/api/";

export default function Authenticate() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Function to handle form submission
  async function handleSubmit(e: FormEvent, type: "login" | "register") {
    e.preventDefault(); // Prevent the default form submission

    console.log("Form submitted: ", type);

    if (type === "login") {
      // Login

      // Get the form data
      const email = (e.target as HTMLFormElement).email.value;
      const password = (e.target as HTMLFormElement).password.value;

      console.log({
        email,
        password,
      });

      // Make a POST request to the server

      const response = await fetch(`${URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      const decodedToken = jwt.decode(data.token);

      console.log(decodedToken);

      // If the response is successful
      if (response.ok) {
        // Set the cookie
        document.cookie = cookie.serialize(
          "session",
          JSON.stringify({ token: data.token, decodedToken }),
          {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
          }
        );
      }

      // Redirect to the homepage
      router.push("/");
    } else {
      // Registration

      // Get the form data
      const username = (e.target as HTMLFormElement).username.value;
      const email = (e.target as HTMLFormElement).email.value;
      const password = (e.target as HTMLFormElement).password.value;

      // Check if the passwords match
      const confirmPassword = (e.target as HTMLFormElement).confirmPassword
        .value;
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Make a POST request to the server
      const response = await fetch(`${URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      // If the response is successful log in the user
      if (response.ok) {
        // make request to login
        const response = await fetch(`${URL}auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        console.log(data);

        const decodedToken = jwt.decode(data.token);

        console.log(decodedToken);

        // If the response is successful

        if (response.ok) {
          // Set the cookie
          document.cookie = cookie.serialize(
            "session",
            JSON.stringify({ token: data.token, decodedToken }),
            {
              maxAge: 60 * 60 * 24 * 7, // 1 week

              path: "/",
            }
          );
        }

        // Redirect to the homepage
        router.push("/");
      }
    } // Get the form data
  }

  // Function to toggle between Login and Register forms
  function toggleForm() {
    setIsRegistering((prev) => !prev); // Toggle the state
    setError(null); // Reset any previous errors when switching forms
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* Conditional rendering based on isRegistering state */}
        {isRegistering ? (
          // Registration Form
          <form
            onSubmit={(e) => handleSubmit(e, "register")}
            className="border rounded p-6 shadow-lg bg-white"
          >
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
            >
              Register
            </button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          // Login Form
          <form
            onSubmit={(e) => handleSubmit(e, "login")}
            className="border rounded p-6 shadow-lg bg-white"
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
            >
              Login
            </button>
            <p className="mt-4 text-center">
              Dont have an account?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-green-500 hover:underline focus:outline-none"
              >
                Register
              </button>
            </p>
          </form>
        )}
      </div>
    </>
  );
}
