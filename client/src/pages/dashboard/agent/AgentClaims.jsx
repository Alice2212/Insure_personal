import React from 'react'
import { useState, useEffect } from "react";
import ProgresContainer from '../../../components/molecules/dashboard/ProgresContainer'
import ProgressBox from '../../../components/molecules/dashboard/ProgressBox'
import { FiledClaims, InProgress, Apporoved } from '../../../utils/ProgressData'
import Searchbar from '../../../components/molecules/dashboard/Searchbar'
import { useLocation } from "react-router-dom";
import Axios from "axios";
import ClaimsFormOverlay from '../../../components/molecules/dashboard/ClaimsFormOverlay';


const AgentClaims = () => {
  const initialClaims = [
    { id: 1, name: "Adewumi Gabriel", description: "Blockchain Dev" },
    { id: 2, name: "Abbas Ahmed", description: "Dev Reels" },
    { id: 3, name: "Alicia Joseph", description: "Software Dev" },
  ];
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [newLeads, setNewLeads] = useState(initialClaims);
  const [inProgress, setInProgress] = useState([]);
  const [closedLeads, setClosedLeads] = useState([])
  const [agentLeadsList, setAgentLeadsList] = useState([]);


  const location = useLocation();
  const formData = location.state?.formData || {};
  const agentId = formData.agent.id

  const baseURL = process.env.REACT_APP_BASE_URL;
  const agentDataURL = `${baseURL}/claim/all/${agentId}`;

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
  }, [agentId]);

  console.log('Hererrrrrrr', agentLeadsList);

  const fetchAgentLeadsData = async () => {
    try {
      const res = await Axios.get(agentDataURL);
      // console.log("response on agentleads pagesssss", res);
      return res?.data?.data?.rows || [];
    } catch (error) {
      console.error("Error fetching agent data:", error);
      return [];
    }
  };

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
        Add Claims
      </button>
      {/* <div className='flex text-center justify-between'>
        <ProgresContainer data={{ title: "NEW LEADS", color: "#F7E69C", box: <ProgressBox data={FiledClaims} /> }} />
        <ProgresContainer data={{ title: "IN PROGRESS", color: "#ADD8E6", box: <ProgressBox data={InProgress} /> }} />
        <ProgresContainer data={{ title: "CLOSED ONES", color: "#B3E2A9", box: <ProgressBox data={Apporoved} /> }} />
      </div> */}
      {isOverlayVisible && <ClaimsFormOverlay onClose={handleOverlayClose} />}
      <section className="bg-[#DFE7FA] h-screen w-full flex flex-wrap justify-between">
        {/* New Leads */}
        <div
          className="widget-container bg-[--white-bg] h-fit mt-4 w-[19rem] rounded-md shadow-md"
          onDrop={(e) => handleOnDrop(e, inProgress, setInProgress)}
          onDragOver={handleDragOver}
        >
          <h4 className="text-[#111111] bg-yellow-200 w-full uppercase h-fit text-center p-2">
            New Claims
          </h4>
          {agentLeadsList.map((lead) => (
            <div
              key={lead.id}
              className="widget border border-gray-400 p-4 m-4 rounded-md w-auto"
              draggable
              onDragStart={(e) => handleOnDragStart(e, lead)}
            >
              <p className="text-gray-800 pb-1">{`${lead.claimsAmount}`}</p>
              <p className="text-gray-600">{lead.claimsDescription}</p>
              <p className="text-gray-600">{`Status: ${lead.paymentStatus}`}</p>
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
            Closed Clams
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
  )
}

export default AgentClaims