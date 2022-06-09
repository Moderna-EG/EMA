import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import ItemsTable from '../../components/tables/items'
import './employee.css'
import ItemModal from '../../components/modal/Item'

const EmployeeItems = () => {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <Navbar />
            {showModal ? <ItemModal modal={closeModal} /> : null }
            <div className="employee-main">
                <div>
                    <Sidebar />
                </div>
                <div className="employee-wrapper">
                    <ItemsTable modal={openModal}/>
                </div>
            </div>
        </div>
    )
}
export default EmployeeItems