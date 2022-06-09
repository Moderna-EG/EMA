import React from 'react'
import { NavLink } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import './sideMenuIcons.css'

const SideMenuIcons = () => {
    return (
        <div className="mobile-icons">
            <NavLink to="/inventory/items">
                <button className="show-sidebar">
                    <ContentPasteIcon />
                </button>
            </NavLink>
            <NavLink to="/inventory/receive-permissions">
                <button className="show-sidebar">
                    <AddBusinessIcon />
                </button>
            </NavLink>
            <NavLink to="/inventory/exchange-permissions">
                <button className="show-sidebar">
                    <LocalShippingIcon />
                </button>
            </NavLink>
        </div>
    )
}

export default SideMenuIcons