import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './employee.css'
import ReceivePermissionTable from '../../components/tables/receivePermission'
import { userRequest } from '../../api/requests'
import ReceivePermissionInvoice from '../../components/printComponent/printReceivePermissionInvoice'
import { useNavigate } from 'react-router-dom'


const ReceivePermission = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
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
                    { !loading ? <ReceivePermissionInvoice items={permissionItems} permission={permission} /> : ''}
                    <ReceivePermissionTable items={permissionItems} loading={loading} />
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
export default ReceivePermission