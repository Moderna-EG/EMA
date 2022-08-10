import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { userRequest } from '../../api/requests'
import './table.css'
import { useNavigate } from 'react-router-dom'
import UpdateMessage from '../update-message/update-message'


const ClientsTable = () => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState()

    const navigate = useNavigate()

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user')).user

        if(user.role === 'مالك') {
            setIsAdmin(true)
        }

        localStorage.setItem('clientId', JSON.stringify(''))

        userRequest.get('/inventory/clients')
        .then(response => {
            setData(formateData(response.data.clients))
            setLoading(false)
        })
        .catch(error => console.error(error))
    }, [loading])

    const toProviderItemsForm = (clientId) => {
        localStorage.setItem('clientId', JSON.stringify(clientId))
        navigate(`/inventory/exchange-permissions/items-form`)
    }


    const deleteClient = async (client) => {

        userRequest.delete(`/inventory/clients/${client.id}`)
        .then(data => {

            setLoading(true)
        })
        .catch(error => {

            const message = error.response.data.message

            setErrorMessage(message)
        })
    }

    const updateClient = async (newClient, oldClient) => {

        const newClientData = {
            clientName: {
                name: newClient.name,
                isNew: true
            },
            clientCode: {
                code: Number.parseInt(newClient.code),
                isNew: true
            },
            clientDescription: {
                description: newClient.description,
                isNew: true
            },
            clientOperationDate: {
                operationDate: newClient.operationdate,
                isNew: true
            }
        }

        if(newClient.name === oldClient.name) {
            newClientData.clientName.isNew = false
        }

        if(newClient.code === oldClient.code) {
            newClientData.clientCode.isNew = false
        }

        if(newClient.description === oldClient.description) {
            newClientData.clientDescription.isNew = false
        }

        if(newClient.operationDate === oldClient.operationDate) {
            newClientData.clientOperationDate.isNew = false
        }


        userRequest.put(`/inventory/clients/${newClient.id}`, newClientData)
        .then(response => setLoading(true))
        .catch(error => {

            console.error(error)

            const errorData = error.response.data

            setErrorMessage(errorData.message)
        })
    }

    const formateData = (clientsData) => {

        for(let i=0;i<clientsData.length;i++) {

            clientsData[i].operationdate = formateDate(clientsData[i].operationdate)
        }

        return clientsData
    }

    const formateDate = (operationDate) => {

        const newDate = new Date(operationDate)

        return `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`
    }

    const columns = [
        { title: 'بداية التشغيل', field: 'operationdate', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الوصف', field: 'description', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الاسم', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'انشاء اذن صرف', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
             render: props => <button className="action-btn" onClick={ e => toProviderItemsForm(props.id)}>انشاء</button>
        },
        { title: 'احصئيات', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
             render: props => <button className="action-btn" onClick={ e => {navigate(`/inventory/clients/${props.id}/stats`)}}>عرض</button>
        }

    ]

    return (
        <div>
            { errorMessage ?
                <UpdateMessage message={errorMessage}/>
                :
                ''
            }
            
            {
                isAdmin ?
                <MaterialTable 
                title=""
                isLoading={loading}
                columns={columns}
                data={data}
                localization={{
                    body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
                }}
                options={{ pageSize: 10, exportButton: true }}
                actions={[
                    {
                        icon: TableIcons.Add,
                        tooltip: 'اضافة عميل',
                        isFreeAction: true,
                        onClick: () => navigate('/inventory/client-form')
                    },
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'تحديث',
                        isFreeAction: true,
                        onClick: () => setLoading(true)
                    }
                ]}

                editable={{
                    onRowUpdate: updateClient,
                    onRowDelete: deleteClient
                }}

                icons={TableIcons}
            />

            :

            <MaterialTable 
                title=""
                isLoading={loading}
                columns={columns}
                data={data}
                localization={{
                    body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
                }}
                options={{ pageSize: 10, exportButton: true }}
                actions={[
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'تحديث',
                        isFreeAction: true,
                        onClick: () => setLoading(true)
                    }
                ]}

                icons={TableIcons}
            />

            }
        </div>
    )

}

export default ClientsTable