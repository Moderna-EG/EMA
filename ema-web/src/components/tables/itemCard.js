import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import BlockIcon from '@mui/icons-material/Block'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ItemCardTable = () => {

    const navigate = useNavigate()


    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const itemId = window.location.pathname.split('/')[3]

        userRequest.get(`inventory/items/${itemId}/item-card`)
        .then(response => {
            
            setPermissions(formateData(response.data.permissions))

            setLoading(false)
        })
        .catch(error => console.error(error))
    } , [loading])

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

        return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    }


    const columns = [
        { title: 'رصيد الكمية', field: 'momentaveragebookvalue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'السعر', field: 'momentaverageprice', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'رصيد الكمية', field: 'momenttotalquantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'قيمة', field: 'exchangepermissionbookvalue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'سعر', field: 'exchangepermissionprice', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كمية', field: 'exchangepermissionquantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'جهة الصرف', field: 'clientcode', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اذن الصرف', field: 'exchangepermissionid', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'قيمة', field: 'receivepermissionbookvalue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'سعر', field: 'receivepermissionprice', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كمية', field: 'receivepermissionquantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'المورد', field: 'providercode', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اذن الوارد', field: 'receivepermissionid', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'التاريخ', field: 'permissiondate', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' },
            render: prop => {
                return <p style={{ width: '5rem' }}>{prop.permissiondate}</p>
            } }
    ]
    
    return (<div>
        <MaterialTable 
        title="" 
        isLoading={loading}
        columns={columns} 
        data={permissions} 
        localization={{
            body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
        }}
        options={ { pageSize: 10, exportButton: true, actionsColumnIndex: -1 } }
        actions={[
            {
                icon: TableIcons.Refresh,
                tooltip: 'تحديث',
                isFreeAction: true,
                onClick: () => setLoading(true)
            },
            {
                icon: TableIcons.Item,
                tooltip: 'الاصناف',
                isFreeAction: true,
                onClick: () => navigate('/inventory/items')
            }
        ]}
        icons={TableIcons} />

    </div>)
}

export default ItemCardTable