import React from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'

const ReceivePermissionTable = () => {

    const data = [
        { id: 1, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910', registrationDate: '6/6/2022'},
        { id: 2, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910', registrationDate: '6/6/2022'},
        { id: 3, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 4, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 5, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 6, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 7, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2021'},
        { id: 8, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 9, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 10, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 11, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 12, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 13, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},
        { id: 14, name: 'فلتر', code: 12345, quantity: 17, price: 1100,  bookValue: 2000, provider: 'نسله', providerCode: '678910',  registrationDate: '6/6/2022'},   
    ]

    const columns = [
        { title: 'التاريخ', field: 'registrationDate', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'كود المورد', field: 'providerCode', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'مورد', field: 'provider', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'القيمة الدفترية', field: 'bookValue', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'السعر', field: 'price', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكمية', field: 'quantity', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الكود', field: 'code', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'اسم الصنف', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'رقم الاذن', field: 'id', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} }
        
    ]
    
    return (<div>
        <MaterialTable 
        title="" 
        columns={columns} 
        data={data} 
        options={ { pageSize: 15, exportButton: true } }
        icons={TableIcons} />
    </div>)
}

export default ReceivePermissionTable