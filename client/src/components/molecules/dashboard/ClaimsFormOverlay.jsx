// {
//     "status": "filed",
//     "claimsAmount": 23456,
//     "paymentStatus": "pending",
//     "claimsDescription": "car insurance",
//     "submittedDate": "23/08/2023"

//   }

import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Axios from "axios";
// import { useAuth } from "../../auth/Authentication/AuthContext";

const ClaimsFormOverlay = ({ onClose }) => {
    const [claimsData, setClaimsData] = useState({
        status: "",
        claimsAmount: "",
        paymentStatus: "",
        claimsDescription: "",
        submittedDate: "",
    });
    const [agentLeadsList, setAgentLeadsList] = useState([]);


    const { handleSubmit, register, formState: { errors }, } = useForm();

    const location = useLocation();
    const formData = location.state?.formData || {};
    const agentId = formData.agent.id

    // console.log(formData, "formData on agent claims");

    const baseURL = process.env.REACT_APP_BASE_URL;
    const agentLeadsURL = `${baseURL}/agent/alleads/${agentId}`;


    useEffect(() => {
        const fetchLeadsData = async () => {
            try {
                const agentLeadsData = await fetchAgentLeadsData();

                setAgentLeadsList(agentLeadsData);
                
                // setFilteredData(transformData(agentLeadsData));
            } catch (error) {
                console.error("Error fetching agent data:", error);
            }
        };

        fetchLeadsData();
    }, [agentId]); // Ensure the useEffect runs when companyId changes

    // console.log('Euvollaaaaaaaaa',agentLeadsList);

    const fetchAgentLeadsData = async () => {
        try {
            const res = await Axios.get(agentLeadsURL);
            console.log("response on agentleads pagesssss",res.data);
            return res?.data?.data?.rows || [];
        } catch (error) {
            console.error("Error fetching agent data:", error);
            return [];
        }
    };

    console.log("uppppp", agentLeadsList[0]?.id)

    const postClaimURL = `${baseURL}/claim/${agentLeadsList[0]?.id}`;

    const onSubmit = async (data, e) => {
        // console.log(data, "reacthookform")
        // console.log("chkaaaaaaaaaaa", claimsData);
        try {
            const response = await axios.post(postClaimURL, data);
            // console.log ("Aliceeeeeee", response)
            if (response.data.status) {
                await Swal.fire({
                    title: "Success!",
                    text: "Claims added successfully!.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                e.target.reset();

                // Pass formData as state to the /auth/otp route
                // navigate('/auth/otp', { state: { formData: response?.data?.data } });
            }
        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: `Registration failed!!!!!  ${error.response.data.message || error.message
                    }`,
                icon: "error",
                confirmButtonText: "OK",
            });
            console.log("Error making POST request:", error);
        }

        // Clear the form data
        // e.target.reset();
    };

    return (
        // <div className="bg-[--black-bg] opacity-50 w-full h-full fixed top-0 left-0 z-10 ">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
            <div className="max-w-md mx-auto mt-8 p-8 border rounded shadow-lg bg-white">
                <form onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Status */}

                    <div className="mb-4">
                        <label
                            className="block text-[--orange-bg] font-medium mb-2"
                            htmlFor="Status"
                        >
                            Status
                        </label>
                        <input
                            className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
                            id="Status"
                            // value={claimsData.firstName}
                            onChange={(e) => {
                                setClaimsData({ ...claimsData, status: e.target.value });
                            }}
                            type="text"
                            name="Status"
                            placeholder="Filed"
                            {...register("Status", {
                                required: "this field is required ",
                            })}
                            defaultValue={claimsData.Status}
                        />

                        <p className="text-red-500 text-sm italic">
                            {errors.status?.message}
                        </p>
                    </div>

                    {/*claims Amount */}

                    <div className="mb-4">
                        <label
                            className="block text-[--orange-bg] font-medium mb-2"
                            htmlFor="middleName"
                        >
                            Claims Amount
                        </label>
                        <input
                            className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
                            id="claimsAmount"
                            defaultValue={claimsData.middleName}
                            onChange={(e) => {
                                setClaimsData({ ...claimsData, claimsAmount: e.target.value });
                            }}
                            type="text"
                            name="claimsAmount"
                            placeholder="6000"
                            {...register("claimsAmount", {
                                required: "this field is required ",
                            })}
                        />

                        <p className="text-red-500 text-sm italic">
                            {errors.claimsAmount?.message}
                        </p>
                    </div>

                    {/* paymentStatus */}

                    <div className="mb-4">
                        <label
                            className="block text-[--orange-bg] font-medium mb-2"
                            htmlFor="paymentStatus"
                        >
                            Payment Status
                        </label>
                        <input
                            className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
                            id="paymentStatus"
                            defaultValue={claimsData.paymentStatus}
                            onChange={(e) => {
                                setClaimsData({ ...claimsData, paymentStatus: e.target.value });
                            }}
                            type="text"
                            name="paymentStatus"
                            placeholder="Pending"
                            {...register("paymentStatus", {
                                required: "this field is required ",
                            })}
                        />

                        <p className="text-red-500 text-sm italic">
                            {errors.paymentStatus?.message}
                        </p>
                    </div>

                    {/* claims Description */}
                    <div className="mb-4">
                        <label
                            className="block text-[--orange-bg] font-medium mb-2"
                            htmlFor="email"
                        >
                            Claims Description
                        </label>
                        <input
                            className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
                            id="claimsDescription"
                            defaultValue={claimsData.email}
                            onChange={(e) => {
                                setClaimsData({ ...claimsData, claimsDescription: e.target.value });
                            }}
                            type="text"
                            name="claimsDescription"
                            placeholder="Car Insurance"
                            {...register("claimsDescription", {
                                required: "this field cannot be empty ",
                            })}
                        />

                        <p className="text-red-500 text-sm italic">
                            {errors.claimsDescription?.message}
                        </p>
                    </div>

                    {/* submittedDate */}
                    <div className="mb-4">
                        <label
                            className="block text-[--orange-bg] font-medium mb-2"
                            htmlFor="submittedDate"
                        >
                            Submitted
                        </label>
                        <input
                            className="appearance-none border border-[--form-border-bg] rounded w-full py-2 px-3 text-[--black-text] leading-tight focus:outline-none focus:border-[--orange-hover]"
                            id="submittedDate"
                            defaultValue={claimsData.submittedDate}
                            onChange={(e) => {
                                setClaimsData({ ...claimsData, submittedDate: e.target.value });
                            }}
                            type="date"
                            name="submittedDate"
                            placeholder="01/12/23"
                            {...register("submittedDate", {
                                required: "this field cannot be empty ",
                            })}
                        />

                        <p className="text-red-500 text-sm italic">
                            {errors.submittedDate?.message}
                        </p>
                    </div>


                    <div className="flex space-x-3">
                        <button
                            className="bg-[--orange-bg] hover:bg-[--orange-hover] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                        // onClick={onSubmit}
                        >
                            Submit
                        </button>

                        {/* </input> */}

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

export default ClaimsFormOverlay;
