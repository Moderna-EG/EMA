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
    const [errorMessage, setErrorMessage] = useState()

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
    }, [loading])

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))

        if(!user) {
            setAuthorized(false)
            navigate('/login')
            return
        }

        setAuthorized(true)

    }, [authorized])

    const updatePermissionItem = async (newData, oldData) => {

        if(newData.quantity !== oldData.quantity) {
            
            userRequest
            .patch(`/inventory/receive-permissions/receive-permissions-items/${newData.id}/quantity`, { newQuantity: Number.parseInt(newData.quantity) })
            .then(response => {
                setLoading(true)
            })
            .catch(error => {
                setErrorMessage(error.response.data.message)
            })
        }

        if(newData.price !== oldData.price) {

            userRequest
            .patch(`/inventory/receive-permissions/receive-permissions-items/${newData.id}/price`, { newPrice: Number.parseInt(newData.price) })
            .then(response => {
                setLoading(true)
            })
            .catch(error => {
                setErrorMessage(error.response.data.message)
            })
        }
    }

    const deletePermissionItem = async (permissionItem) => {


        userRequest.delete(`/inventory/receive-permissions/receive-permissions-items/${permissionItem.id}`)
        .then(response => {
            if(permissionItems.length === 1) {
                navigate('/inventory/receive-permissions')
            } else {
                setLoading(true)
            }
        })
        .catch(error => {
            setErrorMessage(error.response.data.message)
        })
    }

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
                    <ReceivePermissionTable items={permissionItems} loading={loading} deletePermissionItem={deletePermissionItem} updatePermissionItem={updatePermissionItem} errorMessage={errorMessage}/>
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