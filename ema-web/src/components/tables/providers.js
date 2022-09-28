import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import { userRequest } from '../../api/requests'
import './table.css'
import { useNavigate } from 'react-router-dom'
import UpdateMessage from '../update-message/update-message'



const ProvidersTable = () => {

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

        localStorage.setItem('provider-Id', JSON.stringify(''))
        userRequest.get('/inventory/providers')
        .then(response => {
            setData(response.data.providers)
            setLoading(false)
        })
        .catch(error => console.error(error))
    }, [loading, isAdmin])

    const toProviderItemsForm = (providerId) => {
        localStorage.setItem('providerId', JSON.stringify(providerId))
        navigate(`/inventory/receive-permissions/items-form`)
    }

    const columns = [
        { title: 'طريقة الدفع', field: 'paymentmethod', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'العنوان', field: 'address', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الهاتف', field: 'phone', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الوصف', field: 'description', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الاسم', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'انشاء اذن استلام', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
             render: props => <button className="action-btn" onClick={ e => toProviderItemsForm(props.id)}>انشاء</button>
        },
        { title: 'احصئيات', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
             render: props => <button className="action-btn" onClick={ e => navigate(`/inventory/providers/${props.id}/stats`)}>عرض</button>
        }

    ]

    const deleteProvider = async (provider) => {

        userRequest.delete(`/inventory/providers/${provider.id}`)
        .then(data => {

            setLoading(true)
        })
        .catch(error => {

            const message = error.response.data.message

            setErrorMessage(message)
        })
    }

    const updateProvider = async (newProvider, oldProvider) => {

        const newProviderData = {
            providerName: {
                name: newProvider.name,
                isNew: true
            },
            providerCode: {
                code: Number.parseInt(newProvider.code),
                isNew: true
            },
            providerPhone: {
                phone: newProvider.phone,
                isNew: true
            },
            providerDescription: {
                description: newProvider.description,
                isNew: true
            },
            providerPaymentMethod: {
                paymentMethod: newProvider.paymentmethod,
                isNew: true
            },
            providerAddress: {
                address: newProvider.address,
                isNew: true
            }
        }

        if(newProvider.name === oldProvider.name) {
            newProviderData.providerName.isNew = false
        }

        if(newProvider.code === oldProvider.code) {
            newProviderData.providerCode.isNew = false
        }

        if(newProvider.description === oldProvider.description) {
            newProviderData.providerDescription.isNew = false
        }

        if(newProvider.phone === oldProvider.phone) {
            newProviderData.providerPhone.isNew = false
        }

        if(newProvider.address === oldProvider.address) {
            newProviderData.providerAddress.isNew = false
        }

        if(newProvider.paymentmethod === oldProvider.paymentmethod) {
            newProviderData.providerPaymentMethod.isNew = false
        }


        userRequest.put(`/inventory/providers/${newProvider.id}`, newProviderData)
        .then(response => setLoading(true))
        .catch(error => {

            const errorData = error.response.data

            setErrorMessage(errorData.message)
        })
    }


    return (
        <div>
            { errorMessage ?
                <UpdateMessage message={errorMessage} setErrorMessage={setErrorMessage}  />
                :
                ''
            }
                <MaterialTable 
                title={ <h4 style={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>جدول الموردين</h4>}
                isLoading={loading}
                columns={columns}
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
                data={data}
                options={{ pageSize: 10, exportButton: true }}
                actions={[
                    {
                        icon: TableIcons.Add,
                        tooltip: 'انشاء مورد',
                        isFreeAction: true,
                        onClick: () => navigate('/inventory/provider-form')
                    },
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'تحديث',
                        isFreeAction: true,
                        onClick: () => setLoading(true)
                    }
                ]}

                editable={{
                    onRowDelete: deleteProvider,
                    onRowUpdate: updateProvider
                }}

                icons={TableIcons}
            />

            }
        </div>
    )

}

export default ProvidersTable