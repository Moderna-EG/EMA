import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ReceivePermissionForm from '../../components/forms/ReceivePermission'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import ExchangePermissionCartTable from '../../components/tables/exchangePermissionCart'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ExchangePermissionCart = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)

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
                    <ExchangePermissionCartTable />
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
export default ExchangePermissionCart