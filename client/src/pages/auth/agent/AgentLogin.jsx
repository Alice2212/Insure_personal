import Axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

export const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const loginURL = `${baseURL}/auth/login?type=agent`;
  const { login } = useAuth();

  const validateEmail = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    validateEmail();
    validatePassword();

    await Axios.post(loginURL, { email, password })
      .then((res) => {
        if (res.data.status) {
          setIsLoading(false);
          login( res.data.accessToken.access.token, res.data.data.agent.id, "agent");
          Swal.fire({
            title: "Success!",
            text: "Login succesfull!!!!!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard/agent", { state: { formData: res.data.data} });
            }
          });
        } else {
          setIsLoading(false);
          Swal.fire({
            title: "Error!",
            text: "Login failed!!!!!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Login failed!!!!!",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          setIsLoading(false);
          if (result.isConfirmed) {
            setEmail("");
            setPassword("");
          }
        });
      });
  };

  return (
    <main className="flex flex-col lg:flex-row lg:w-full">
      {/* Left Column */}
      <div
        className="flex-1 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: 'url("https://tinyurl.com/29p8xwx3")' }}
      ></div>

      {/* Right Column (image) */}
      <div className="sm:px-20 lg:w-[50%] h-screen flex flex-col px-8">
        {/* Logo */}
        <a href="index.html">
          <img
            src="https://tinyurl.com/3wuh45ve"
            alt="logo"
            className="mb-2 w-16 h-12 mt-20 lg:w-24 lg:h-14"
          />
        </a>
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-bold mb-4 text-2xl lg:text-4xl">
            Welcome <span className="text-red-500"> Back </span> Agent
          </h1>
        </div>
        {/* Form Area */}
        <form
          name="Login"
          onSubmit={handleSubmit}
          className="flex flex-col w-full"
        >
          {/* agent email */}
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            placeholder="Enter email address"
            className={`w-full h-[40px] px-3 py-2 border border-gray-900 rounded-md mb-4 focus:border-blue-500 ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              placeholder="Enter password"
              className={`w-full h-[40px] px-3 py-2 border border-gray-900 rounded-md mb-4 focus:border-blue-500 ${
                passwordError ? "border-red-500" : ""
              }`}
            />
            <span
              className="absolute right-4 top-2 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </span>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {/* Proceed button */}
          <button
            type="submit"
            className="w-full h-[40px] bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-400 mb-8"
            id="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div>
            <a href="/">
              <b>Forget Password?</b>
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};
