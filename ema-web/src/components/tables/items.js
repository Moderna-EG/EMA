import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { userRequest } from '../../api/requests'

const ItemsTable = ({ modal }) => {

    /*const data = [
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'جرار', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
        { name: 'فلتر', code: 12345, quantity: 20 },
    ]*/

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        userRequest.get('/inventory/items')
        .then(items => {
            setData(items.data.items)
            setLoading(false)
        })
        .catch(error => console.error(error))
    } , [loading])


    const columns = [
        { title: 'الكمية', field: 'quantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اسم الصنف', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'صنف', render: prop => <ContentPasteIcon /> }
    ]
    
    return (<div>
        <MaterialTable 
        title="" 
        isLoading={loading}
        columns={columns} 
        data={data} 
        options={ { pageSize: 10, exportButton: true } }
        actions={[
            {
                icon: TableIcons.Add,
                tooltip: 'اضافة صنف',
                isFreeAction: true,
                onClick: () => modal()
            },
            {
                icon: TableIcons.Refresh,
                tooltip: 'تحديث',
                isFreeAction: true,
                onClick: () => setLoading(true)
            }
        ]}
        icons={TableIcons} />

    </div>)
}

export default ItemsTable