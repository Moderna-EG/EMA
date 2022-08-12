import React, { useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { userRequest } from '../../api/requests'
import UpdateMessage from '../update-message/update-message'

const ExchangePermission = ({ items, loading, updatePermissionItem, deletePermissionItem, errorMessage }) => {

    const columns = [
        { 
            title: 'قيمة دفترية',
            field: 'bookvalue',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
        },
        { 
            title: 'سعر',
            field: 'price',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
        },
        { 
            title: 'الكمية',
            field: 'quantity',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'كود',
            field: 'code',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
        },
        { 
            title: 'الصنف',
            field: 'name',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
        },
        { 
            title: 'المعرف',
            field: 'id',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
        }
    ]

    const [isAdmin, setIsAdmin] = useState(false)

    const permissionId = window.location.pathname.split('/')[3]

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user')).user

        if(user.role === 'مالك') {
            setIsAdmin(true)
        }

    }, [isAdmin])
    
    return (<div>
        {
            errorMessage ?
            <UpdateMessage message={errorMessage} />
            :
            ''
        }
        {
            isAdmin ?
            <MaterialTable 
        title={permissionId}
        isLoading={loading}
        localization={{
            body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
        }}
        columns={columns} 
        data={items}
        options={ { exportButton: true } }
        editable={{
            onRowDelete: deletePermissionItem,
            onRowUpdate: updatePermissionItem
        }}
        icons={TableIcons} />

        :

        <MaterialTable 
        title={permissionId}
        isLoading={loading}
        localization={{
            body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
        }}
        columns={columns} 
        data={items}
        options={ { exportButton: true } }
        icons={TableIcons} />
        }
    </div>)
}

export default ExchangePermission