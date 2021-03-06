import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import ReceivePermissionForm from '../../components/forms/ReceivePermission'
import './employee.css'
import SuccessModal from '../../components/modal/success'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import ReceivePermissionTable from '../../components/tables/receivePermission'
import { userRequest } from '../../api/requests'
import ReceivePermissionInvoice from '../../components/printComponent/printReceivePermissionInvoice'
import DownloadInvoicePdf from '../../components/downloads/downloadReceivePermission'



const ReceivePermission = () => {

    const [permission, setPermission] = useState()
    const [permissionItems, setPermissionItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))
        
        const permissionId = window.location.pathname.split('/')[3]

        userRequest(`/inventory/receive-permissions/${permissionId}`)
        .then(response => {
            setPermissionItems(response.data.permissionItems)
            setPermission(response.data.permission)
            setLoading(false)
        })
        .catch(error => console.error(error))
    }, [])

    return (
        <div>
            <Navbar />
            <div className="employee-main">
                <div className="employee-wrapper">
                    <SideMenuIcons />
                    { !loading ? <ReceivePermissionInvoice items={permissionItems} permission={permission} /> : ''}
                    <ReceivePermissionTable items={permissionItems} loading={loading} />
                </div>
                <div>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
export default ReceivePermission