import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import EmployeesTable from '../../components/tables/employees'
import './employee.css'
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