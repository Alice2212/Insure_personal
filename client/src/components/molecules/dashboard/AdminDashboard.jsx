import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import DashboardTemplate from './DashboardTemplate'
import AdminSidebar from './AdminSidebar'
import NotificationBar from './NotificationBar'
import { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {

  const location = useLocation();
  const formData = location.state?.formData || {};
    
  return (
    <>
        <DashboardTemplate 
            sidebar={<AdminSidebar topic={formData} />}

            notificationSection={<NotificationBar topic={ formData.user.companyProfile.companyName} />}
            
            dashboardBody={ <Outlet  topic={formData} />}
        />
    </>
  )
}

export default AdminDashboard
