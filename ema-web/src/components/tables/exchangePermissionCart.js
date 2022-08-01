import React, { useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ExchangePermissionCart = () => {

    const navigate = useNavigate()
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('exchangePermissionItems')))
    const user = JSON.parse(localStorage.getItem('user'))
    const client = JSON.parse(localStorage.getItem('clientId'))

    useEffect(() => {},[items])

    const submit = () => {

        if(items.length === 0) {
            return 
        }

        const permissionData = {
            clientId: client,
            userId: user.user.id,
            items: items
        }

        userRequest.post('/inventory/exchange-permissions', permissionData)
        .then(response => {
            navigate(`/inventory/exchange-permissions/${response.data.permissionId}`)
        })
        .catch(error => console.error((error)))
    }

    const deleteItem = (itemId) => {
        const newItems = items.filter(item => item.id !== itemId)
        setItems(newItems)
    }

    const updateItem = (newItem, oldItem) => {
        const storedItems = items.filter(item => item.id !== oldItem.id)
        newItem.bookValue = newItem.quantity * newItem.price
        setItems([...storedItems, newItem])
    }

    

    const columns = [
        { 
            title: 'قيمة دفترية',
            field: 'bookValue',
            headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
            editable: 'never'
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
            editable: 'never'
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
        localization={{
            body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
            header: { actions: '' }
        }}
        columns={columns} 
        data={items}
        
        actions={[
            {
                icon: TableIcons.Confirm,
                tooltip: 'تاكيد اذن الصرف',
                isFreeAction: true,
                onClick: () => submit()
            },
            {
                icon: TableIcons.Delete,
                tooltip: 'ازالة صنف',
                onClick: (event, rowData) => deleteItem(rowData.id)
            }
        ]}
        options={ { pageSize: 10 } }
        icons={TableIcons} />
    </div>)
}

export default ExchangePermissionCart