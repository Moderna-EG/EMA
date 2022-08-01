import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ClientForm from '../../components/forms/Client'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import { useNavigate } from 'react-router-dom'

const ClientFormPage = () => {

    const navigate = useNavigate()

    const [successModal, setSuccessModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [authorized, setAuthorized] = useState(false)

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
            authorized ?
            <div>
            <Navbar />
            { successModal ? <SuccessModal closeModal={closeModal} message={modalMessage}/> : undefined }
            <div className="employee-main">
                <div className="employee-wrapper">
                    <ClientForm modal={showModal} />
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

export default ClientFormPage