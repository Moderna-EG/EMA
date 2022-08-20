import React from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import UpdateMessage from '../update-message/update-message'


const ItemCardTable = ({ permissions, loading, setLoadingTrue, setLoadigFalse, errorMessage }) => {    


    const columns = [
        { title: 'رصيد الكمية', field: 'momentaveragebookvalue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'السعر', field: 'momentaverageprice', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'رصيد الكمية', field: 'momenttotalquantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'قيمة', field: 'exchangepermissionbookvalue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'سعر', field: 'exchangepermissionprice', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كمية', field: 'exchangepermissionquantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'جهة الصرف', field: 'clientcode', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اذن الصرف', field: 'exchangepermissionid', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'قيمة', field: 'receivepermissionbookvalue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'سعر', field: 'receivepermissionprice', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كمية', field: 'receivepermissionquantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'المورد', field: 'providercode', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اذن الوارد', field: 'receivepermissionid', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'التاريخ', field: 'permissiondate', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' },
            render: prop => {
                return <p style={{ width: '5rem' }}>{prop.permissiondate}</p>
            } }
    ]
    
    return (<div>

        { errorMessage ? 
        <div>
            <UpdateMessage message={errorMessage} />
        </div>
        :
        ''    
        }
        <MaterialTable 
        title={ <h4 style={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>جدول كارتة الصنف</h4>}
        isLoading={loading}
        columns={columns} 
        data={permissions} 
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
        options={ { pageSize: 10, exportButton: true, actionsColumnIndex: -1 } }
        actions={[
            {
                icon: TableIcons.Refresh,
                tooltip: 'تحديث',
                isFreeAction: true,
                onClick: () => setLoadingTrue()
            }
        ]}
        icons={TableIcons} />

    </div>)
}

export default ItemCardTable