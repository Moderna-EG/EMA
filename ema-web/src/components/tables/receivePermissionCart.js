import React, { useState } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import { TailSpin } from 'react-loader-spinner'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ReceivePermissionCart = () => {

    const navigate = useNavigate()
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('receivePermissionItems')))
    const [isLoading, setIsLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const provider = JSON.parse(localStorage.getItem('providerId'))

    const submit = () => {

        if(items.length === 0) {
            return 
        }

        const permissionData = {
            providerId: provider,
            userId: user.user.id,
            items: items
        }

        setIsLoading(true)
        userRequest.post('/inventory/receive-permissions', permissionData)
        .then(response => {
            setIsLoading(false)
            navigate(`/inventory/receive-permissions/${response.data.permissionId}`)
        })
        .catch(error => {
            setIsLoading(false)
            console.error(error)

        })
    }

    const deleteItem = async (deletedItem) => {

        const newItems = []

        for(let i=0;i<items.length;i++) {

            if(items[i].itemId === deletedItem.itemId) {
                continue
            }

            newItems.push(items[i])
        }

        if(newItems.length === 0) {
            return navigate('/inventory/receive-permissions')
        }

        setItems(newItems)
    }

    const updateItem = async (newItem, oldItem) => {
        
        const newItems = []

        for(let i=0;i<items.length;i++) {

            if(items[i].itemId === newItem.itemId) {
                
                let newItemData = items[i]
                newItemData.price = newItem.price
                newItemData.quantity = newItem.quantity
                newItemData.bookValue = Number.parseInt(newItem.price) * newItem.quantity

                newItems.push(newItemData)
                continue
            }

            newItems.push(items[i])
        }

        setItems(items)
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
        title={ isLoading ? 
        <TailSpin color="red" width="40" height="40" /> 
        : 
        <h4 style={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>جدول تاكيد اذن الاستلام</h4> 
        }
        localization={{
            body: {
                emptyDataSourceMessage: 'لا يوجد سجلات',
                
            },
            editRow: {
                deleteText: 'مسح',
                cancelTooltip: 'الغاء'
            },
            header: {
                actions: ''
            },
            toolbar: {
                exportTitle: 'تنزيل',
                exportAriaLabel: 'تنزيل',
                searchTooltip: 'بحث',
                searchPlaceholder: 'بحث'
            },
            pagination: {
                labelRowsSelect: 'سجلات',
                labelRowsPerPage: 'سجل للصفحة',
                firstAriaLabel: 'الصفحة الاولة',
                firstTooltip: 'الصفحة الاولة',
                previousAriaLabel: 'الصفحة السابقة',
                previousTooltip: 'الصفحة السابقة',
                nextAriaLabel: 'الصفحة التالية',
                nextTooltip: 'الصفحة التالية',
                lastAriaLabel: 'الصفحة الاخيرة',
                lastTooltip: 'الصفحة الاخيرة',
            }

        }}
        columns={columns} 
        data={items}
        editable={{
            onRowUpdate: updateItem,
            onRowDelete: deleteItem
        }}
        actions={[
            {
                icon: TableIcons.Confirm,
                tooltip: 'تاكيد اذن الاستلام',
                isFreeAction: true,
                onClick: () => submit()
            }
        ]}
        options={ { pageSize: 10 } }
        icons={TableIcons} />
    </div>)
}

export default ReceivePermissionCart