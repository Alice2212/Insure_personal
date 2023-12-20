import React, { useEffect } from "react";
import SalesBox from "../../../components/molecules/dashboard/SalesBox";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../../../utils/Data";
import { useState } from "react";
import PieChart from "../../../components/molecules/dashboard/PieChart";
import { BarChart } from "../../../components/molecules/dashboard/BarChart";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/molecules/dashboard/AdminSidebar";
import Track from "../../../components/molecules/dashboard/Track";
import NotificationBar from "../../../components/molecules/dashboard/NotificationBar";
import SalesBoxGroup from "../../../components/molecules/dashboard/SalesBoxGroup";
import Axios from "axios";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../auth/Authentication/AuthContext";
Chart.register(CategoryScale);


const AdminHome = () => {
  const [homeData, setHomeData] = useState("");
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const { login } = useAuth();

  const location = useLocation();
  const formData = location.state?.formData || {};

  //login
  // formData.companyProfile.companyName
  // // formData.companyProfile.id
  // formData.companyProfile
  //   ?  formData.companyProfile.companyName
  //   : formData.

  console.log(formData, "formData on hompage")


  const baseURL = process.env.REACT_APP_BASE_URL;
  const otpURL = `${baseURL}/dash/company/${formData.user.companyProfile.id}`;
  console.log("i wqs here")



  useEffect(() => {
    console.log("first reload");
    const fetchData = async () => {
      await Axios.get(otpURL)
        .then((res) => {
          setHomeData(res.data.data);
          console.log(res.data.data, "response data");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <body className="flex bg-gray-100 min-h-screen">
        <div className="flex-grow text-gray-800 bg-blue-100">
          <section className="container max-w-5xl mx-auto flex flex-col justify-center items-center">
            <SalesBoxGroup homeData={homeData} />
            <div
              className="flex flex-col md:flex-row justify-evenly items-center gap-y-5 mx-auto  md:space-x-6 w-full
            "
            >
              <div
                className="w-[48%] px-5 bg-white py-20 items-center rounded-md
              "
              >
                <BarChart chartData={chartData} topic={"Monthly Revenue"} />
              </div>

              <div className="w-[48%] bg-white rounded-md">
                <PieChart chartData={chartData} />
              </div>
            </div>

            <Track topic={"Recent Sales"} />
          </section>
        </div>
      </body>
    </div>
  );
};

export default AdminHome;
