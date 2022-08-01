import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import './employee.css'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import ExchangePermissionsTable from '../../components/tables/exchangePermissions'

const ExchangePermissions = () => {


    return (
        <div>
            <Navbar />
            <div className="employee-main">
                <div className="employee-wrapper">
                    <SideMenuIcons />
                    <ExchangePermissionsTable />
                </div>
                <div>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
export default ExchangePermissions