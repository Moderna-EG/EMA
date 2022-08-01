import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import ItemCardTable from '../../components/tables/itemCard'
import Sidebar from '../../components/sidebar/SideBar'
import './employee.css'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'
import ItemCardInvoice from '../../components/printComponent/printItemCardInvoice'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ItemCard = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)

    const [errorMessage, setErrorMessage] = useState()

    const setLoadingTrue = () => {
        setLoading(true)
    }

    const setLoadingFalse = () => {
        setLoading(false)
    }

    useEffect(() => {

        const itemId = window.location.pathname.split('/')[3]

        userRequest.get(`inventory/items/${itemId}/item-card`)
        .then(response => {
            
            setPermissions(formateData(response.data.permissions))
            setItem(response.data.item)

            setLoading(false)
        })
        .catch(error => {

            const errorData = error.response.data

            if(errorData.field === 'itemId') {
                return navigate('/no-item')
            }

            if(errorData.field === 'provider') {
                return setErrorMessage(errorData.message)
            }

            if(errorData.field === 'client') {
                return setErrorMessage(errorData.message)
            }
        })
    } , [loading])

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))

        if(!user) {
            setAuthorized(false)
            navigate('/login')
            return
        }

        setAuthorized(true)

    }, [authorized])

    const formateData = (permissions) => {

        for(let i=0;i<permissions.length;i++) {

            if(permissions[i].permissiontype === 'receive') {

                permissions[i].exchangepermissionquantity = 0
                permissions[i].exchangepermissionprice = 0
                permissions[i].exchangepermissionbookvalue = 0
                permissions[i].exchangepermissionid = 0
                permissions[i].clientcode = 0
                permissions[i].clientid = 0
                permissions[i].clientname = 0

            } else if(permissions[i].permissiontype === 'exchange') {

                permissions[i].receivepermissionquantity = 0
                permissions[i].receivepermissionprice = 0
                permissions[i].receivepermissionbookvalue = 0
                permissions[i].receivepermissionid = 0
                permissions[i].providercode = 0
                permissions[i].providerid = 0
                permissions[i].providername = 0

            }

            permissions[i].permissiondate = formateDate(permissions[i].permissiondate)
        }

        return permissions
    }

    const formateDate = (permissionDate) => {

        const newDate = new Date(permissionDate)

        return `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`
    }


    return (
        <>
        {
            authorized
            ?
            <div>
            <Navbar />
            <Sidebar />
            <div className="employee-main">
                <div className="employee-wrapper item-card-table">
                    
                    <div>
                        { loading ? '' : <ItemCardInvoice permissions={permissions} item={item} /> }
                        <ItemCardTable permissions={permissions} loading={loading} setLoadingFalse={setLoadingFalse} setLoadingTrue={setLoadingTrue} errorMessage={errorMessage} />
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
export default ItemCard