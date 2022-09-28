import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
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

    const formateDateWithZeros = editedDate => {

        let splittedDate = editedDate.split('-')
        let newMonth = splittedDate[0]
        let newDay = splittedDate[1]

        if(splittedDate[0].length === 1) {
            newMonth = '0' + splittedDate[0]
        }

        if(splittedDate[1].length === 1) {
            newDay = '0' + splittedDate[1]
        }

        return `${newMonth}-${newDay}-${splittedDate[2]}`
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

        const editedDate = formateDateWithZeros(newClientData.clientOperationDate.operationDate)

        newClientData.clientOperationDate.operationDate = editedDate
        

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

        return `${newDate.getMonth() + 1}-${newDate.getDate() + 1 }-${newDate.getFullYear()}`
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
                <UpdateMessage message={errorMessage} setErrorMessage={setErrorMessage} />
                :
                ''
            }
            
                <MaterialTable 
                title={ <h4 style={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>جدول العملاء</h4>}
                isLoading={loading}
                columns={columns}
                data={data}
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

            }
        </div>
    )

}

export default ClientsTable