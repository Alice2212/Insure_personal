import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BUTTON from "../../../components/molecules/global/Button";

const AdminForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Validate if email is not empty
    if (!email.trim()) {
      setError('Please enter a valid email address or username.');
      setSuccessMessage('');
    } else {
      // Clear any previous error
      setError('');

      // Display success message
      setSuccessMessage('Reset instructions sent to your email address.');
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <form className="rounded-md w-[500px] p-5" onSubmit={handleResetPassword}>
        <div className="logo flex justify-center items-center">
          <img src="https://tinyurl.com/3wuh45ve" alt="INSURE LOGO" />
        </div>
        <div className="flex flex-col w-full my-2">
          {successMessage && (
            <div className="w-full py-3 px-5 border border-green-500 border-l-4 border-l-[#34c759] mb-5">
              {successMessage}
            </div>
          )}
          <div className="w-full py-3 px-5 border border-gray-900 border-l-4 border-l-[#e76927] mb-5">
            Please, enter your username or email address. You will receive an
            email message with instructions on how to reset your password.
          </div>
          <input
            type="text"
            className={`px-2 py-3 my-2 rounded-[3px] border ${
              error ? 'border-red-500' : 'border-blue-500'
            } focus:outline-none`}
            placeholder="Enter username or email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {/* fixed this button with */}
        <BUTTON description="Get new password" width="w-full" />
        <Link to="/login" className="text-[12px] mt-5 pl-2">
          Login
        </Link>
      </form>
    </main>
  );
};

export default AdminForgetPassword;