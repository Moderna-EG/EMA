import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import '../employee.css'
import './graphs.css'
import { useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { userRequest } from '../../../api/requests'
import ReceivedItemsGraph from '../../../components/graphs/items-graphs/received-item-graph'
import ExchangedItemsGraph from '../../../components/graphs/items-graphs/exchanged-items-graphs'

const ItemsGraphs = () => {

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
                                <ReceivedItemsGraph />
                            </div>
                            <hr />
                            <div className="graph">
                                <ExchangedItemsGraph />
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
export default ItemsGraphs