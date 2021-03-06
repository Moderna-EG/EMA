import React, { useRef } from 'react'
import './table.css'

class ItemCardInvoice extends React.Component {

  formateDate(date) {

    const permissionDate = new Date(date)


    return `${(permissionDate.getMonth() + 1)}/${permissionDate.getDate()}/${permissionDate.getFullYear()}`
  }

  formateData = (permissions) => {

    for(let i=0;i<permissions.length;i++) {

        permissions[i].permissiondate = this.formateDate(permissions[i].permissiondate)

        if(permissions[i].permissiontype === 'receive') {

            permissions[i].exchangepermissionquantity = 0
            permissions[i].exchangepermissionprice = 0
            permissions[i].exchangepermissionbookvalue = 0
            permissions[i].exchangepermissionid = 0
            permissions[i].clientcode = 0
            permissions[i].clientid = 0
            permissions[i].clientname = 0

        } else if(permissions[i].permissiontype === 'exchange') {

            permissions[i].receivepermissionquantity = 0
            permissions[i].receivepermissionprice = 0
            permissions[i].receivepermissionbookvalue = 0
            permissions[i].receivepermissionid = 0
            permissions[i].providercode = 0
            permissions[i].providerid = 0
            permissions[i].providername = 0

        }

    }

    return permissions
}

    viewItemPermissions() {

        let permissions = this.formateData(this.props.permissions)

        return permissions.map(permission => {


            return <tr>

                <td>{permission.momentaveragebookvalue}</td>
                <td>{permission.momentaverageprice}</td>
                <td>{permission.momenttotalquantity}</td>

                <td>{permission.exchangepermissionbookvalue}</td>
                <td>{permission.exchangepermissionprice}</td>
                <td>{permission.exchangepermissionquantity}</td>
                <td>{permission.clientcode}</td>
                <td>{permission.exchangepermissionid}</td>

                <td>{permission.receivepermissionbookvalue}</td>
                <td>{permission.receivepermissionprice}</td>
                <td>{permission.receivepermissionquantity}</td>
                <td>{permission.providercode}</td>
                <td>{permission.receivepermissionid}</td>

                <td>{permission.permissiondate}</td>
            </tr>
        })
    }


    render() {

        
        return (
            
            <div className="print-permission-container">
              <h4>
                ?????????? ?????? <br />
              </h4>
              <div className="print-permission-header-data">
                <p>
                    ?????? ??????????
                    /
                    <span> {this.props.item.name}</span>
                </p>
                <p>
                    ?????????? ????????????
                    /
                    <span> {this.props.item.code}</span>
                </p>
                <p>
                    ??????????
                </p>
              </div>
              <table className="permission">
                <tr>
                    <td rowspan="2">
                        ???????? ????????????
                    </td>
                    <td rowspan="2">
                        ??????????
                    </td>
                    <td rowspan="2">
                        ???????? ????????????
                    </td>
                    <td colspan="5">
                        ??????????????
                    </td>
                    <td colspan="5">
                        ????????????
                    </td>
                    <td rowspan="2">
                        ??????????????
                    </td>
                </tr>
                <tr>
                    <td>????????</td>
                    <td>??????</td>
                    <td>????????</td>
                    <td>?????? ??????????</td>
                    <td>?????? ??????????</td>
                
                    
                    <td>????????</td>
                    <td>??????</td>
                    <td>????????</td>
                    <td>????????????</td>
                    <td>?????? ????????????</td>
                </tr>
            
                { this.viewItemPermissions() }

              </table>
            </div>
          )
    }
    
}

export default ItemCardInvoice