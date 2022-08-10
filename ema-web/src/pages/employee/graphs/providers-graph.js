import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import '../employee.css'
import './graphs.css'
import { useNavigate } from 'react-router-dom'
import ProvidersQuantityGraph from '../../../components/graphs/providers-graph/providers-quantity-graph'
import ProvidersBookValueGraph from '../../../components/graphs/providers-graph/providers-book-value-graph'

const ProvidersGraph = () => {

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
                                <ProvidersQuantityGraph />
                            </div>
                            <hr />
                            <div className="graph">
                                <ProvidersBookValueGraph />
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
export default ProvidersGraph