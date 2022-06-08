import React from 'react'
import './sidebar.css'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-icons employee-side-bar">
            <ul>
                <li>
                    <NavLink to="/inventory/items">
                        <ContentPasteIcon />
                        <span>اصناف</span> 
                    </NavLink> 
                </li>
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
                <li className="logout">
                    <NavLink to="/login">
                        <LogoutIcon />
                        <span>خروج</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar