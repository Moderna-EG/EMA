import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ReceivePermissionTable from '../../components/tables/receivedItems'
import './receiveItem.css'

const ReceiveItem = () => {
    return (
        <div>
            <Navbar />
            <div className="receive-items-main">
                <div>
                    <Sidebar />
                </div>
                <div className="receive-items-wrapper">
                    <ReceivePermissionTable />
                </div>
            </div>
        </div>
    )
}

export default ReceiveItem
