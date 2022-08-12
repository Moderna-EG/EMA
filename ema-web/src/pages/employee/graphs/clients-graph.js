import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import '../employee.css'
import './graphs.css'
import { useNavigate } from 'react-router-dom'
import ClientsQuantityGraph from '../../../components/graphs/clients-graphs/clients-quantity-graph'
import ClientsBookValueGraph from '../../../components/graphs/clients-graphs/clients-book-value-graph'


const ClientsGraph = () => {

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
                        <div className="employee-wrapper graph-container">
                            <div className="graph">
                                <ClientsQuantityGraph />
                            </div>
                            <hr />
                            <div className="graph">
                                <ClientsBookValueGraph />
                            </div>
                        </div>
                    </div>
                </div>
                :
                ''
                
        }
        </>
    )
}
export default ClientsGraph