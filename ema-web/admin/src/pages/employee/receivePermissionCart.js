import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import ReceivePermissionForm from '../../components/forms/ReceivePermission'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import ReceivePermissionCartTable from '../../components/tables/receivePermissionCart'
import { userRequest } from '../../api/requests'

const ReceivePermissionCart = () => {


    return (
        <div>
            <Navbar />
            <div className="employee-main">
                <div>
                    <Sidebar />
                </div>
                <div className="employee-wrapper">
                    <SideMenuIcons />
                    <ReceivePermissionCartTable />
                </div>
            </div>
        </div>
    )
}
export default ReceivePermissionCart