import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import ExchangePermissionForm from '../../components/forms/ExchangePermission'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'

const EmployeeExchangePermission = () => {

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
                <div>
                    <Sidebar />
                </div>
                <div className="employee-wrapper">
                    <SideMenuIcons />
                    <ExchangePermissionForm modal={showModal} />
                </div>
            </div>
        </div>
    )
}
export default EmployeeExchangePermission