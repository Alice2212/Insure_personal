import React, { useState, useEffect } from "react";
import { TeamData } from "../../../utils/Data";
import Table from "../../../components/molecules/dashboard/Table";
import { transformData } from "../../../utils/DataTransformer";
import ActionButton from "../../../components/molecules/dashboard/ActionButton";
import Searchbar from "../../../components/molecules/dashboard/Searchbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const AdminTeams = () => {
  const [agentDataList, setAgentDataList] = useState([]);
  const [filteredData, setFilteredData] = useState(transformData(agentDataList));

  const location = useLocation();
  const formData = location.state?.formData || {};
  const companyId = formData.user.companyProfile.id;


  const baseURL = process.env.REACT_APP_BASE_URL;
  const agentDataURL = `${baseURL}/company/allcompanyagent/${companyId}`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentData = await fetchAgentData();

        const newAgentList = agentData.map((data) => ({
          fullName: `${data.firstName} ${data.lastName}`,
          agentID: `${formData.user.companyProfile.companyName
            .slice(0, 3)
            .toUpperCase()}/${data.id}`,
          role: "Agent",
          email: `${data.email}`,
          dateAdded: `${new Date(data.createdAt).toDateString()}`,
        }));
        setAgentDataList(newAgentList);
        setFilteredData(transformData(newAgentList));
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };

    fetchData();
  }, [companyId]); // Ensure the useEffect runs when companyId changes

  const fetchAgentData = async () => {
    try {
      const res = await Axios.get(agentDataURL);
      return res?.data?.data.rows || [];
    } catch (error) {
      console.error("Error fetching agent data:", error);
      return [];
    }
  };

  const updateFilteredData = (newData) => {
    setFilteredData(transformData(newData));
  };

  let tableHead = {
    head1: "S/N",
    head2: "Name",
    head3: "Agent ID",
    head4: "Role",
    head5: "Email",
    head6: "Date Added",
    head7: "Status",
  };

  const handleButtonClick = () => {
    navigate("/auth/admin/team-invite", { state: { formData } });
  };

  return (
    <div>
      <Searchbar
        data={agentDataList}
        keyword="fullName"
        onUpdateData={updateFilteredData}
      />
      <div className="flex justify-between mb-4"></div>

      {/* <ActionButton title="Invite Agent"  /> */}
      <button
        onClick={handleButtonClick}
        type="submit"
        className="sm:w-full lg:w-[20%] h-[40px] bg-orange-600 text-white font-bold py-2 px-2 rounded-md hover:bg-orange-400 mb-2"
      >
        Invite Agent
      </button>

      <Table data={{ tableHead, tabledata: filteredData }} />

    </div>
  );
};

export default AdminTeams;
