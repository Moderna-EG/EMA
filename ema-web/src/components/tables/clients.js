import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { userRequest } from '../../api/requests'
import './table.css'
import { useNavigate } from 'react-router-dom'


const ClientsTable = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('clientId', JSON.stringify(''))
        userRequest.get('/inventory/clients')
        .then(response => {
            setData(response.data.clients)
            setLoading(false)
        })
        .catch(error => console.error(error))
    }, [loading])

    const toProviderItemsForm = (clientId) => {
        localStorage.setItem('clientId', JSON.stringify(clientId))
        navigate(`/inventory/exchange-permissions/items-form`)
    }

    const columns = [
        { title: 'الوصف', field: 'description', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الاسم', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'انشاء اذن صرف', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'},
             render: props => <button className="action-btn" onClick={ e => toProviderItemsForm(props.id)}>انشاء</button>
        }

    ]

    return (
        <div>
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
        </div>
    )

}

export default ClientsTable