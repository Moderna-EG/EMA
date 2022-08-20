import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './employee.css'
import ClientsTable from '../../components/tables/clients'
import { useNavigate } from 'react-router-dom'

const Clients = () => {

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
            { authorized ? 
                <div>
                    <Navbar />
                    <Sidebar />
                    <div className="employee-main">
                        <div className="employee-wrapper">
                            <ClientsTable />
                        </div>
                    </div>
                </div>
                :
                ''
                
        }
        </>
    )
}
export default Clients