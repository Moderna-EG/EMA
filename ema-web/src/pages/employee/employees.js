import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/SideBar'
import EmployeesTable from '../../components/tables/employees'
import './employee.css'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import EmployeeModal from '../../components/modal/employee'
import { useNavigate } from 'react-router-dom'

const EmployeesPage = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const [showModal, setShowModal] = useState(false)


    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))

        if(!user) {
            setAuthorized(false)
            navigate('/login')
            return
        }

        if(user.user.role !== 'مالك') {
            setAuthorized(false)
            navigate('/unauthorized')
            return
        }

        setAuthorized(true)

    }, [authorized])



    return (
        <>
        {
            authorized
            ?
            <div>
            <Navbar />
            {showModal ? <EmployeeModal modal={closeModal} /> : null }
            <div className="employee-main">
                <div className="employee-wrapper">
                    <EmployeesTable modal={openModal} />
                </div>
                <div>
                    { showSidebar ? <Sidebar /> : null}
                </div>
            </div>
        </div>
        :
        ''
        }
        </>
    )
}
export default EmployeesPage