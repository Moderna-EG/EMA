import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ItemsTable from '../../components/tables/items'
import './employee.css'
import { useNavigate } from 'react-router-dom'


const EmployeeItems = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)

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
                    <ItemsTable modal={openModal}/>
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
export default EmployeeItems