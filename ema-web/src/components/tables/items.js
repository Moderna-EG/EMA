import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ItemsTable = ({ modal }) => {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [load, setLoad] = useState(true)
    const [editable, setEditable] = useState(false)




    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user')).user

        console.log(user.role)

        if(user.role === 'مالك') {
            console.log('here')
        }


        //generatePDF()
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
        { title: 'صنف', render: prop => <ContentPasteIcon />, headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كارتة الصنف',render: prop => <button className="action-btn" onClick={ e => navigate(`/inventory/items/${prop.id}/item-card`)}>عرض</button>, headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}}
    ]
    
    return (<div>
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

    </div>)
}

export default ItemsTable