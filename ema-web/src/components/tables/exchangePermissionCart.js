import React, { useState } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const ExchangePermissionCart = () => {

    const navigate = useNavigate()
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('exchangePermissionItems')))
    const [isLoading, setIsLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const client = JSON.parse(localStorage.getItem('clientId'))

    const submit = () => {

        if(items.length === 0) {
            return 
        }

        const permissionData = {
            clientId: client,
            userId: user.user.id,
            items: items
        }

        setIsLoading(true)
        userRequest.post('/inventory/exchange-permissions', permissionData)
        .then(response => {
            setIsLoading(false)
            navigate(`/inventory/exchange-permissions/${response.data.permissionId}`)
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false)
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
            return navigate('/inventory/exchange-permissions')
        }

        setItems(newItems)
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
        <h4 style={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>جدول تاكيد اذن الصرف</h4>  
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
            onRowDelete: deleteItem,
        }}
        actions={[
            {
                icon: TableIcons.Confirm,
                tooltip: 'تاكيد اذن الصرف',
                isFreeAction: true,
                onClick: () => submit()
            },
        ]}
        options={ { pageSize: 10 } }
        icons={TableIcons} />
    </div>)
}

export default ExchangePermissionCart