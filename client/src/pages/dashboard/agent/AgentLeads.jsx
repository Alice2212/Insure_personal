import React from "react";
import { useState, useEffect } from "react";
import ActionButton from "../../../components/molecules/dashboard/ActionButton";
import Searchbar from "../../../components/molecules/dashboard/Searchbar";
import LeadFormOverlay from "../../../components/molecules/dashboard/LeadFormOverlay";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const AgentLeads = () => {
  // lead data
  const initialLeads = [
    { id: 1, name: "Adewumi Gabriel", description: "Blockchain Dev" },
    { id: 2, name: "Abbas Ahmed", description: "Dev Reels" },
    { id: 3, name: "Alicia Joseph", description: "Software Dev" },
  ];
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [newLeads, setNewLeads] = useState(initialLeads);
  const [inProgress, setInProgress] = useState([]);
  const [closedLeads, setClosedLeads] = useState([])
  const [agentLeadsList, setAgentLeadsList] = useState([]);


  const location = useLocation();
  const formData = location.state?.formData || {};
  const agentId = formData.agent.id

  const baseURL = process.env.REACT_APP_BASE_URL;
  const agentDataURL = `${baseURL}/agent/alleads/${agentId}`;

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


  const fetchAgentLeadsData = async () => {
    try {
      const res = await Axios.get(agentDataURL);
      console.log("response on agentleads pagesssss", res);
      return res?.data?.data?.rows || [];
    } catch (error) {
      console.error("Error fetching agent data:", error);
      return [];
    }
  };

  // console.log("Iyaannnnnnnuuuuuu", agentLeadsList);

  const handleOnDragStart = (e, lead) => {
    e.dataTransfer.setData("text/plain", lead.id.toString());
  };

  const handleOnDrop = (e, targetList, setTargetList) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    const lead = newLeads.find((item) => item.id === parseInt(leadId, 10));

    if (lead) {
      // Check if the lead is not already in the target list
      if (!targetList.some((item) => item.id === lead.id)) {
        // Remove the lead from the source list
        const updatedSourceLeads = newLeads.filter(
          (item) => item.id !== lead.id
        );
        setNewLeads(updatedSourceLeads);

        // Update the target list by adding the new lead
        setTargetList([...targetList, lead]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    setOverlayVisible(true);
  };

  const handleOverlayClose = () => {
    setOverlayVisible(false);

  };

  return (
    <>
      <Searchbar />
      <button
        onClick={handleButtonClick}
        type="submit"
        className="sm:w-full lg:w-[20%] h-[40px] bg-orange-600 text-white font-bold py-2 px-2 rounded-md hover:bg-orange-400 mb-2"
      >
        Add Lead
      </button>
      {/* <div className="w-[7rem">
        <ActionButton title="Add New" onClick={handleButtonClick} />
      </div> */}

      {isOverlayVisible && <LeadFormOverlay onClose={handleOverlayClose} />}
      <section className="bg-[#DFE7FA] h-screen w-full flex flex-wrap justify-between">
        {/* New Leads */}
        <div
          className="widget-container bg-[--white-bg] h-fit mt-4 w-[19rem] rounded-md shadow-md"
          onDrop={(e) => handleOnDrop(e, inProgress, setInProgress)}
          onDragOver={handleDragOver}
        >
          <h4 className="text-[#111111] bg-yellow-200 w-full uppercase h-fit text-center p-2">
            New Leads
          </h4>
          {agentLeadsList.map((lead) => (
            <div
              key={lead.id}
              className="widget border border-gray-400 p-4 m-4 rounded-md w-auto"
              draggable
              onDragStart={(e) => handleOnDragStart(e, lead)}
            >
              <p className="text-gray-800 pb-1">{`${lead.firstName} ${lead.lastName}`}</p>
              <p className="text-gray-600">{lead.email}</p>
              <p className="text-gray-600">{lead.phoneNumber}</p>
              {/* <button className="text-gray-400 text-right">See More</button> */}
            </div>
          ))}
        </div>

        {/* In Progress */}
        <div
          className="widget-container bg-[--white-bg] mt-4 w-[19rem] h-fit rounded-md shadow-md"
          onDrop={(e) => handleOnDrop(e, inProgress, setInProgress)}
          onDragOver={handleDragOver}
        >
          <h4 className="text-[#111111] bg-blue-200 w-full uppercase text-center p-2">
            In Progress
          </h4>
          {inProgress.map((lead) => (
            <div
              key={lead.id}
              className="widget border border-gray-400 p-4 m-4 rounded-md w-auto"
              draggable
              onDragStart={(e) => handleOnDragStart(e, lead)}
            >
              <h4 className="text-gray-800 pb-1">{lead.name}</h4>
              <p className="text-gray-600">{lead.description}</p>
              {/* <p className="text-gray-400 text-right">See More</p> */}
            </div>
          ))}
        </div>
        {/* Closed Leads */}
        <div
          className="widget-container bg-[--white-bg] mt-4 w-[19rem] h-fit rounded-md shadow-md"
          onDrop={(e) => handleOnDrop(e, closedLeads, setClosedLeads)}
          onDragOver={handleDragOver}
        >
          <h4 className="text-[#111111] bg-green-200 w-full uppercase text-center p-2">
            Closed Leads
          </h4>
          {closedLeads.map((lead) => (
            <div
              key={lead.id}
              className="widget border border-gray-400 p-4 m-4 rounded-md w-auto"
              draggable
              onDragStart={(e) => handleOnDragStart(e, lead)}
            >
              <h4 className="text-gray-800 pb-1">{lead.name}</h4>
              <p className="text-gray-600">{lead.description}</p>
              {/* <p className="text-gray-400 text-right">See More</p> */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AgentLeads;
