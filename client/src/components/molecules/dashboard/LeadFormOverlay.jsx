import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
// import { useAuth } from "../../auth/Authentication/AuthContext";

const LeadFormOverlay = ({ onClose }) => {
  const [leadData, setLeadData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    gender: "",
    Address: "",
    phoneNumber: "",
    status: "new",
    policyNumber: "",
    totalAmountPaid: "",
    role: "leads",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();


  const location = useLocation();
  const formData = location.state?.formData || {};

  console.log(formData, "formData on agentLeads")


  const baseURL = process.env.REACT_APP_BASE_URL;
  const agentLeadsURL = `${baseURL}/agent/lead/${formData.agent.id}`;

  const onSubmit = async (e) => {
    console.log('chkaaaaaaaaaaa', leadData);
    try {
      const response = await axios.post(agentLeadsURL, leadData);

      if (response.data.status) {
        await Swal.fire({
          title: 'Success!',
          text: 'Lead added successfully!.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        e.target.reset();

        // Pass formData as state to the /auth/otp route
        // navigate('/auth/otp', { state: { formData: response?.data?.data } });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: `Registration failed!!!!!  ${error.response.data.message || error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.log('Error making POST request:', error);
    }

    // Clear the form data
    e.target.reset();
  };

  return (
    // <div className="bg-[--black-bg] opacity-50 w-full h-full fixed top-0 left-0 z-10 ">
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
      <div className="max-w-md mx-auto mt-8 p-8 border rounded shadow-lg bg-white">
        <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
          {/* First Name */}

          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="firstName"
              // value={leadData.firstName}
              onChange={(e) => { setLeadData({ ...leadData, firstName: e.target.value }); }}
              type="text"
              name="firstName"
              placeholder="John"
              {...register("firstName", {
                required: "this field is required ",
              })}
              defaultValue={leadData.firstName}
            />

            <p className="text-red-500 text-sm italic">
              {errors.firstName?.message}
            </p>
          </div>

          {/* Middle Name */}

          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="middleName"
            >
              Middle Name
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="middleName"
              defaultValue={leadData.middleName}
              onChange={(e) => {
                setLeadData({ ...leadData, middleName: e.target.value });
              }}
              type="text"
              name="middleName"
              placeholder="Timothy"
              {...register("middleName", {
                required: "this field is required ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.middleName?.message}
            </p>
          </div>

          {/* Last Name */}

          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="lastName"
              defaultValue={leadData.lastName}
              onChange={(e) => {
                setLeadData({ ...leadData, lastName: e.target.value });
              }}
              type="text"
              name="lastName"
              placeholder="Doe"
              {...register("lastName", {
                required: "this field is required ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.lastName?.message}
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="email"
              defaultValue={leadData.email}
              onChange={(e) => {
                setLeadData({ ...leadData, email: e.target.value });
              }}
              type="email"
              name="email"
              placeholder="johndoetim@email.com"
              {...register("email", {
                required: "this field cannot be empty ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.email?.message}
            </p>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="gender"
              defaultValue={leadData.gender}
              onChange={(e) => {
                setLeadData({ ...leadData, gender: e.target.value });
              }}
              type="text"
              name="gender"
              placeholder="male/female"
              {...register("gender", {
                required: "this field cannot be empty ",
              })}
            />

            <p className="text-red-500 text-sm italic">{errors.gender?.message}</p>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="Address"
            >
              Address
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="Address"
              defaultValue={leadData.Address}
              onChange={(e) => {
                setLeadData({ ...leadData, Address: e.target.value });
              }}
              type="text"
              name="Address"
              placeholder="No.12 lekki phase 1 Lagos, Nigeria"
              {...register("Address", {
                required: "this field cannot be empty ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.Address?.message}
            </p>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="phoneNumber"
              defaultValue={leadData.phoneNumber}
              onChange={(e) => {
                setLeadData({ ...leadData, phoneNumber: e.target.value });
              }}
              type="tel"
              name="phoneNumber"
              placeholder="+234-123-234-1234"
              {...register("phoneNumber", {
                required: "this field cannot be empty ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.phoneNumber?.message}
            </p>
          </div>

          {/* Policy Number */}
          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="policyNumber"
            >
              Policy Number
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="policyNumber"
              defaultValue={leadData.policyNumber}
              onChange={(e) => {
                setLeadData({ ...leadData, policyNumber: e.target.value });
              }}
              type="text"
              name="policyNumber"
              placeholder="xxx-xxx-xx"
              {...register("policyNumber", {
                required: "this field cannot be empty ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.policy?.message}
            </p>
          </div>

          {/* Total Amount Paid */}
          <div className="mb-4">
            <label
              className="block text-[--orange-bg] font-medium mb-2"
              htmlFor="AmountPaid"
            >
              Amount Paid
            </label>
            <input
              className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
              id="AmountPaid"
              defaultValue={leadData.AmountPaid}
              onChange={(e) => {
                setLeadData({ ...leadData, AmountPaid: e.target.value });
              }}
              type="text"
              name="AmountPaid"
              placeholder=""
              {...register("AmountPaid", {
                required: "this field cannot be empty ",
              })}
            />

            <p className="text-red-500 text-sm italic">
              {errors.AmountPaid?.message}
            </p>
          </div>

          <div className="flex space-x-3">
            <input
              className="bg-[--orange-bg] hover:bg-[--orange-hover] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
              value="submit"
            />
            <input
              className="bg-[--orange-bg] hover:bg-[--orange-hover] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
              value="close"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadFormOverlay;
