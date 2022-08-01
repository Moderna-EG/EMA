import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/SideBar'
import ItemsTable from '../../components/tables/items'
import './employee.css'
import ItemModal from '../../components/modal/Item'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
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
            {showModal ? <ItemModal modal={closeModal} /> : null }
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