import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import ReceivePermissionForm from '../../components/forms/ReceivePermission'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'

const EmployeeReceivePermission = () => {

    const [successModal, setSuccessModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const closeModal = () => {
        setSuccessModal(false)
    }

    const showModal = (message) => {
        setSuccessModal(true)
        setModalMessage(message)
    }

    return (
        <div>
            <Navbar />
            { successModal ? <SuccessModal closeModal={closeModal} message={modalMessage}/> : undefined }
            <div className="employee-main">
                <div className="employee-wrapper">
                    <SideMenuIcons />
                    <ReceivePermissionForm />
                </div>
                <div>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
export default EmployeeReceivePermission