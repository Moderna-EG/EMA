import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ItemsTable from '../../components/tables/items'
import './dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="dashboard-main">
                <div>
                    <Sidebar />
                </div>
                <div className="items-wrapper">
                    <ItemsTable />
                </div>
            </div>
        </div>
    )
}
export default Dashboard