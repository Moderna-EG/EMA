import React from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const ItemsPermissionTable = () => {

    const data = [
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: '',
            exchangeId: 89,
            provider: '',
            providerCode: '',
            receiverCode: 686419,
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
        {
            name: 'فلتر',
            code: 12345,
            permissionId: 67,
            exchangeId: '',
            provider: 'محمد',
            providerCode: 451321,
            receiverCode: '',
            quantity: 7,
            price: 7000,
            value: 98000,
            date: '6/6/2022'
        },
    ]

    const columns = [
        { 
            title: 'تاريخ',
            field: 'date',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'قيمة',
            field: 'value',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
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
            title: 'كود مورد',
            field: 'providerCode',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'كود مستلم',
            field: 'receiverCode',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'مورد',
            field: 'provider',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'اذن صرف',
            field: 'exchangeId',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'اذن الاستلام',
            field: 'permissionId',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
            title: 'كود',
            field: 'code',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
        { 
        title: 'اسم الصنف',
        field: 'name',
        headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}
        },
    ]
    
    return (<div>
        <MaterialTable 
        title="" 
        columns={columns} 
        data={data} 
        options={ { pageSize: 15, exportButton: true } }
        icons={TableIcons} />
    </div>)
}

export default ItemsPermissionTable