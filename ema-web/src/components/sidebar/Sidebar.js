import React, { useEffect, useState } from 'react'
import './sidebar.css'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import EngineeringIcon from '@mui/icons-material/Engineering'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

const Sidebar = () => {

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user')).user

        if(user.role === 'مالك') {
            setIsAdmin(true)
        }

    }, [isAdmin])
    return (
        <div className="sidebar-icons employee-side-bar">
            <ul>
                <li>
                    <NavLink to="/inventory/items">
                        <ContentPasteIcon />
                        <span>اصناف</span> 
                    </NavLink> 
                </li>
                { isAdmin ?
                <li>
                    <NavLink to="/inventory/items/stats">
                        <QueryStatsIcon />
                        <span>احصائيات الاصناف</span>
                    </NavLink>
                </li>
                :
                ''    
                }
                <li>
                    <NavLink to="/inventory/receive-permissions">
                        <AddBusinessIcon />
                        <span> استلام</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/inventory/exchange-permissions">
                        <LocalShippingIcon />
                        <span>  صرف</span>
                    </NavLink>
                </li>
                { isAdmin ?
                <li>
                    <NavLink to="/inventory/employees">
                        <EngineeringIcon />
                        <span>موظف</span>
                    </NavLink>
                </li>
                :
                ''    
                }
                <li>
                    <NavLink to="/inventory/providers">
                        <AssignmentIndIcon />
                        <span>موردين</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/inventory/clients">
                        <PeopleAltIcon />
                        <span>عملاء</span>
                    </NavLink>
                </li>
                <li className="logout">
                    <NavLink to="/login" onClick={ e => localStorage.setItem('user', null)}>
                        <LogoutIcon />
                        <span>خروج</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar