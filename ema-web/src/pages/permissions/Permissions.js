import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ItemsPermissionsTable from '../../components/tables/itemPermissions'
import './permissions.css'

const ReceiveItem = () => {
    return (
        <div>
            <Navbar />
            <div className="permissions-items-main">
                <div>
                    <Sidebar />
                </div>
                <div className="permissions-items-wrapper">
                    <ItemsPermissionsTable />
                </div>
            </div>
        </div>
    )
}

export default ReceiveItem