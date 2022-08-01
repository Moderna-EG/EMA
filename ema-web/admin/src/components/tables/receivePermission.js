import React, { useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { userRequest } from '../../api/requests'

const ReceivePermission = ({ items, loading }) => {

    const columns = [
        { 
            title: 'قيمة دفترية',
            field: 'bookvalue',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
        },
        { 
            title: 'سعر',
            field: 'price',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
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
        },
        { 
            title: 'الصنف',
            field: 'name',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
        },
    ]
    
    return (<div>
        <MaterialTable 
        title=""
        isLoading={loading}
        localization={{
            body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
        }}
        columns={columns} 
        data={items}
        options={ { exportButton: true } }
        editable={{
            onRowUpdate: true,
            onRowDelete: true
        }}
        icons={TableIcons} />
    </div>)
}

export default ReceivePermission