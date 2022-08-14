import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'
import UpdateMessage from '../update-message/update-message'


const ItemsTable = ({ modal }) => {

    const navigate = useNavigate()

    const [isAdmin, setIsAdmin] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [load, setLoad] = useState(true)
    const [editable, setEditable] = useState(false)
    const [errorMessage, setErrorMessage] = useState()


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user')).user

        if(user.role === 'مالك') {
            setIsAdmin(true)
        }

        //generatePDF()
        userRequest.get('/inventory/items')
        .then(items => {
            setData(items.data.items)
            setLoading(false)
        })
        .catch(error => console.error(error))


    } , [loading, isAdmin])

    const updateItem = async (newItem, oldItem) => {

        const newItemData = {
            itemName: {
                name: newItem.name,
                isNew: true
            },
            itemCode: {
                code: Number.parseInt(newItem.code),
                isNew: true
            }
        }

        if(newItem.name === oldItem.name) {
            newItemData.itemName.isNew = false
        }

        if(newItem.code === oldItem.code) {
            newItemData.itemCode.isNew = false
        }

        userRequest.put(`/inventory/items/${newItem.id}`, newItemData)
        .then(response => setLoading(true))
        .catch(error => {

            const errorData = error.response.data

            setErrorMessage(errorData.message)
        })
    }

    const deleteItem = async (item) => {

        userRequest.delete(`/inventory/items/${item.id}`)
        .then(data => {

            setLoading(true)
        })
        .catch(error => {

            const message = error.response.data.message

            setErrorMessage(message)
        })
    }


    const columns = [
        { title: 'الكمية', field: 'quantity', editable: 'never', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اسم الصنف', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'صنف', render: prop => <ContentPasteIcon />, headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كارتة الصنف',render: prop => <button className="action-btn" onClick={ e => navigate(`/inventory/items/${prop.id}/item-card`)}>عرض</button>, headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}}
    ]
    
    return (<div>
                { errorMessage ?
                <UpdateMessage message={errorMessage}/>
                :
                ''
                }
        { isAdmin
            ?
            <MaterialTable 
                title="" 
                isLoading={loading}
                columns={columns} 
                data={data} 
                localization={{
                    body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
                }}
                options={ { pageSize: 10, exportButton: true, actionsColumnIndex: -1 } }
                actions={[
                    {
                        icon: TableIcons.Add,
                        tooltip: 'اضافة صنف',
                        isFreeAction: true,
                        onClick: () => navigate('/inventory/item-form')
                    },
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'تحديث',
                        isFreeAction: true,
                        onClick: () => setLoading(true)
                    }
                ]}

                editable={{
                    onRowUpdate: updateItem,
                    onRowDelete: deleteItem
                }}

                icons={TableIcons} />

                    :

                    <MaterialTable 
                    title="" 
                    isLoading={loading}
                    columns={columns} 
                    data={data} 
                    localization={{
                        body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
                    }}
                    options={ { pageSize: 10, exportButton: true, actionsColumnIndex: -1 } }
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
        }

    </div>)
}

export default ItemsTable