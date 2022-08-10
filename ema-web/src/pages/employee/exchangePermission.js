import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './employee.css'
import ExchangePermissionTable from '../../components/tables/exchangePermission'
import { userRequest } from '../../api/requests'
import ExchangePermissionInvoice from '../../components/printComponent/printExchangePermissionInvoice'
import { useNavigate } from 'react-router-dom'


const ExchangePermission = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
    const [permission, setPermission] = useState()
    const [permissionItems, setPermissionItems] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const permissionId = window.location.pathname.split('/')[3]


        userRequest(`/inventory/exchange-permissions/${permissionId}`)
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
            return navigate('/login')
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
                    { !loading ? <ExchangePermissionInvoice items={permissionItems} permission={permission}/> : '' }
                    <ExchangePermissionTable items={permissionItems} loading={loading} />
                    
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
export default ExchangePermission