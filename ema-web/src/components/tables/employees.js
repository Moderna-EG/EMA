import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import { userRequest } from '../../api/requests'
import { useNavigate } from 'react-router-dom'
import UpdateMessage from '../update-message/update-message'


const EmployeesTable = ({ modal }) => {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        userRequest.get('/inventory/users/employees')
        .then(response => {
            setData(formateData(response.data.employees).reverse())

            setLoading(false)
        })
        .catch(error => console.error(error))
    } , [loading])

    const blockEmployee = (employeeId) => {

        userRequest.patch(`/inventory/users/employees/${employeeId}/block`)
        .then(response => setLoading(true))
        .catch(error => console.error(error))
    }

    const enableEmployee = (employeeId) => {

        userRequest.patch(`/inventory/users/employees/${employeeId}/enable`)
        .then(response => setLoading(true))
        .catch(error => {
            console.log(error)
        })
    }

    const formateData = (employeesData) => {

        for(let i=0;i<employeesData.length;i++) {

            employeesData[i].registrationdate = formateDate(employeesData[i].registrationdate)
        }

        return employeesData
    }

    const formateDate = (registrationDate) => {

        const newDate = new Date(registrationDate)

        return `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`
    }

    const updateEmployee = async (newEmployee, oldEmployee) => {

        const newEmployeeData = {
            employeeName: {
                name: newEmployee.name,
                isNew: true
            },
            employeeEmail: {
                email: newEmployee.email,
                isNew: true
            },
            employeePhone: {
                phone: newEmployee.phone,
                isNew: true
            }
        }

        if(newEmployee.name === oldEmployee.name) {
            newEmployeeData.employeeName.isNew = false
        }

        if(newEmployee.email === oldEmployee.email) {
            newEmployeeData.employeeEmail.isNew = false
        }

        if(newEmployee.phone === oldEmployee.phone) {
            newEmployeeData.employeePhone.isNew = false
        }


        userRequest.put(`/inventory/users/employees/${newEmployee.id}`, newEmployeeData)
        .then(response => setLoading(true))
        .catch(error => {

            const errorData = error.response.data

            setErrorMessage(errorData.message)
        })
    }

    const deleteEmployee = async (employee) => {

        userRequest.delete(`/inventory/users/employees/${employee.id}`)
        .then(data => {

            setLoading(true)
        })
        .catch(error => {

            const message = error.response.data.message

            setErrorMessage(message)
        })
    }


    const columns = [
        { title: 'تاريخ التسجيل', field: 'registrationdate', editable: 'never', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الهاتف', field: 'phone', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'البريد', field: 'email', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الاسم ', field: 'name', headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'} },
        { title: 'الدخول',render: prop => {
            if(prop.isworking) {
                return <button className="action-btn" onClick={e => blockEmployee(prop.id)}>مسموح</button>
            }

            return <button className="action-btn" onClick={e => enableEmployee(prop.id)}>ممنوع</button>

        }, headerStyle: {fontWeight: 'bold', fontFamily: 'Cairo, sans-serif'}}
    ]
    
    return (<div>

            { errorMessage ?
                <UpdateMessage message={errorMessage} setErrorMessage={setErrorMessage}/>
                :
                ''
            }

            <MaterialTable 
            title={ <h4 style={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>جدول الموظفيين</h4>}
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
            options={ { pageSize: 10, exportButton: true, actionsColumnIndex: 0 } }
            actions={[
                {
                    icon: TableIcons.Add,
                    tooltip: 'اضافة موظف',
                    isFreeAction: true,
                    onClick: () => navigate('/inventory/employee-form')
                },
                {
                    icon: TableIcons.Refresh,
                    tooltip: 'تحديث',
                    isFreeAction: true,
                    onClick: () => setLoading(true)
                }
            ]}

            editable={{
                onRowUpdate: updateEmployee,
                onRowDelete: deleteEmployee
            }}

            icons={TableIcons} />

    </div>)
}

export default EmployeesTable