import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import './employee.css'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import ExchangePermissionTable from '../../components/tables/exchangePermission'
import { userRequest } from '../../api/requests'
import ExchangePermissionInvoice from '../../components/printComponent/printExchangePermissionInvoice'


const ReceivePermission = () => {

    const [permission, setPermission] = useState()
    const [permissionItems, setPermissionItems] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))
        userRequest(`/inventory/exchange-permissions/users/${user.user.id}`)
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
                <div>
                    <Sidebar />
                </div>
                <div className="employee-wrapper">
                    <SideMenuIcons />
                    { !loading ? <ExchangePermissionInvoice items={permissionItems} permission={permission}/> : '' }
                    <ExchangePermissionTable items={permissionItems} loading={loading} />
                    
                </div>
            </div>
        </div>
    )
}
export default ReceivePermission