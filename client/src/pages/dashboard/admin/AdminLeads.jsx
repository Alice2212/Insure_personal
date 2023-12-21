import React, { useState, useEffect } from 'react'
// import { LeadsData } from '../../../utils/Data'
import Table from '../../../components/molecules/dashboard/Table'
import { transformData } from '../../../utils/DataTransformer'
import ActionButton from '../../../components/molecules/dashboard/ActionButton'
import Searchbar from '../../../components/molecules/dashboard/Searchbar'
import { useLocation } from "react-router-dom";
import Axios from "axios";



const AdminLeads = () => {
  const [agentLeadsList, setAgentLeadsList] = useState([]);
  const [filteredData, setFilteredData] = useState(transformData(agentLeadsList));
  
  const location = useLocation();
  const formData = location.state?.formData || {};
  const companyId = formData.user.companyProfile.id;
  


  const baseURL = process.env.REACT_APP_BASE_URL;
  const leadsURL = `${baseURL}/company/allcompanyleads/${companyId}`;
  
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const agentLeadsData = await fetchAgentLeadsData();

        const newAgentList = agentLeadsData.map((data) => ({
          clientName: `${data.firstName} ${data.lastName}`,
          email: `${data.email}`,
          phoneNumber: `${data.phoneNumber}`,
          agentID: `${data.agentId}`,
          dateAdded: `${new Date(data.createdAt).toDateString()}`,
          status: `${data.status}`,
        }));
        
        
        setFilteredData(transformData(newAgentList));

        setAgentLeadsList(newAgentList)

      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };
    
    fetchLeadsData();
  }, [companyId]); // Ensure the useEffect runs when companyId changes

  const fetchAgentLeadsData = async () => {
    try {
      const res = await Axios.get(leadsURL);
      
      console.log("response on adminleads pagesssss", res);
      return res?.data?.data?.rows || [];
    } catch (error) {
      console.error("Error fetching agent data:", error);
      return [];
    }
  };

  const updateFilteredData = (newData) => {
    setFilteredData(transformData(newData));
  };

  console.log(leadsURL, "result of leadsURL")
  console.log('meeeeeeeeeeeeeeeee', agentLeadsList);


  let tableHead={
    head1: "S/N",
    head2: "Client Name",
    head3: "Email",
    head4: "Phone Num",
    head5: "Agent ID",
    head6: "Date Added",
    head7: "Status"
  }

  return (
    <div>
      <Searchbar data={agentLeadsList} keyword="clientName" onUpdateData={updateFilteredData} />
      <div className='flex justify-between mb-4'>
        {/* <div className='flex'>
          <ActionButton title='PDF'/>
          <ActionButton title='EXCEL'/>
          <ActionButton title='PRINT'/>
        </div> */}
      </div>
      
      <Table data={{tableHead, tabledata: filteredData}}/>

    </div>
  )
}

export default AdminLeads