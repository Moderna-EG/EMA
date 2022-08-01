import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/SideBar'
import './employee.css'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import ExchangePermissionsTable from '../../components/tables/exchangePermissions'
import { useNavigate } from 'react-router-dom'

const ExchangePermissions = () => {

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
                    <ExchangePermissionsTable />
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
export default ExchangePermissions