import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'

const ReceivePermissionsTable = () => {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        userRequest.get('/inventory/receive-permissions')
        .then(items => {
            setData(formateData(items.data.permissions))
            setLoading(false)
        })
        .catch(error => console.error(error))
    } , [loading])

    const formateData = (permissionData) => {

        for(let i=0;i<permissionData.length;i++) {

            permissionData[i].permissiondate = formateDate(permissionData[i].permissiondate)
        }

        return permissionData
    }

    const formateDate = (permissionDate) => {

        const newDate = new Date(permissionDate)

        return `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()} ${newDate.getHours() + 1}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    }
  




    const columns = [
        { title: 'تاريخ الاذن', field: 'permissiondate', editable: 'never', render: prop => <p style={{ width: '10rem' }}>{prop.permissiondate}</p>, headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اسم المسجل', field: 'username', editable: 'never', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'القيمة الدفترية', field: 'totalvalue', editable: 'never', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كود المورد', field: 'providercode', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اسم المورد', field: 'providername', editable: 'never', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'رقم الاذن', field: 'permissionid', editable: 'never', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'تفاصيل الاذن', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}, render: prop => <button className="action-btn" onClick={ e => navigate(`/inventory/receive-permissions/${prop.permissionid}`) }>عرض</button>}
    
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
                        tooltip: 'اضافة اذن استلام',
                        isFreeAction: true,
                        onClick: () => navigate('/inventory/providers')
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

export default ReceivePermissionsTable