import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import DashboardTemplate from './DashboardTemplate'
import AgentSidebar from './AgentSidebar'
import NotificationBar from './NotificationBar'
import Searchbar from './Searchbar'
import { useLocation } from 'react-router-dom';


const AgentDashboard = () => {

  const location = useLocation();
  const formData = location.state?.formData || {};
  console.log(formData, 'agentdashboard formdata');
  return (
   <>
        <DashboardTemplate 
            sidebar={<AgentSidebar topic={formData} />}

            notificationSection={<NotificationBar topic={ formData.agent.firstName} />}
            
            dashboardBody={ <Outlet topic={formData} />}
        />
   </>
  )
}

export default AgentDashboard;
