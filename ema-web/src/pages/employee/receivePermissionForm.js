import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/SideBar'
import ReceivePermissionForm from '../../components/forms/ReceivePermission'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import { useNavigate } from 'react-router-dom'

const EmployeeReceivePermission = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const closeModal = () => {
        setSuccessModal(false)
    }

    const showModal = (message) => {
        setSuccessModal(true)
        setModalMessage(message)
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
            { successModal ? <SuccessModal closeModal={closeModal} message={modalMessage}/> : undefined }
            <div className="employee-main">
                <div className="employee-wrapper">
                    <ReceivePermissionForm />
                </div>
                <div>
                    <Sidebar />
                </div>
            </div>
        </div>
        :
        ''
        }
        </>
    )
}
export default EmployeeReceivePermission