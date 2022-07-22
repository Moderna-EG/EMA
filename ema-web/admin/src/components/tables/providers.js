import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { userRequest } from '../../api/requests'
import './table.css'
import { useNavigate } from 'react-router-dom'


const ProvidersTable = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('provider-Id', JSON.stringify(''))
        userRequest.get('/inventory/providers')
        .then(response => {
            setData(response.data.providers)
            setLoading(false)
        })
        .catch(error => console.error(error))
    }, [loading])

    const toProviderItemsForm = (providerId) => {
        localStorage.setItem('providerId', JSON.stringify(providerId))
        navigate(`/inventory/receive-permissions/items-form`)
    }

    const columns = [
        { title: 'طريقة الدفع', field: 'paymentmethod', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
       // { title: 'العنوان', field: 'address', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الهاتف', field: 'phone', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الوصف', field: 'description', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الاسم', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'انشاء اذن استلام', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
             render: props => <button className="action-btn" onClick={ e => toProviderItemsForm(props.id)}>انشاء</button>
        }

    ]

    return (
        <div>
            <MaterialTable 
                title=""
                isLoading={loading}
                columns={columns}
                localization={{
                    body: { emptyDataSourceMessage: 'لا يوجد سجلات' },
                }}
                data={data}
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
        </div>
    )

}

export default ProvidersTable