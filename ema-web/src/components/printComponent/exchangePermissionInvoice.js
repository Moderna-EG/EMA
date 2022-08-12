import React from 'react'
import './table.css'

class ExchangePermissionInvoice extends React.Component {

  formateDate() {
    const permissionDate = new Date(this.props.permission.permissiondate)

    return `${permissionDate.getDate()}/${(permissionDate.getMonth() + 1)}/${permissionDate.getFullYear()}`
  }

    viewItems() {

        return this.props.items.map(item => {
            return <tr>
                <td>{item.bookvalue}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
            </tr>
        })
    }


    render() {
        return (
            
            <div className="print-permission-container">
                { /*this.props.permission */}
              <h4>
                اذن صرف بضاعة <br /><span>{this.props.permission.permissionid}</span>
              </h4>
              <div className="print-permission-header-data">
                <p>
                    التاريخ / <span> { this.formateDate() }</span>
                </p>
                <p>
                  جهة الصرف / <span>{ this.props.permission.clientname } - { this.props.permission.clientcode }</span>
                </p>
              </div>
              <table className="permission">
                <tr>
                    <th>القيمة الدفترية</th>
                    <th>السعر</th>
                    <th>الكمية</th>
                    <th>الكود</th>
                    <th>الصنف</th>
                </tr>
                { this.viewItems() }
                
                <tr>
                    <td colspan="4">{ this.props.permission.totalvalue }</td>
                    <td colspan="1"><strong>الاجمالي</strong></td>
                </tr>
              </table>
              <div className="print-permission-footer">
                <p>
                    المستلم
                </p>
              </div>
            </div>
          )
    }
    
}

export default ExchangePermissionInvoice