import React from 'react'
import './sidebar.css'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import EngineeringIcon from '@mui/icons-material/Engineering'
import DomainIcon from '@mui/icons-material/Domain'
import TodayIcon from '@mui/icons-material/Today'

const Sidebar = () => {
    return (
        <div className="sidebar-icons">
            <ul>
                <li>
                    <ContentPasteIcon />
                    <span>اصناف</span>   
                </li>
                <li>
                    <TodayIcon />
                    <span>نشاط المخزن</span>
                </li>
                <li>
                    <AddBusinessIcon />
                    <span>الوارد</span>
                </li>
                <li>
                    <LocalShippingIcon />
                    <span>المنصرف</span>
                </li>
                <li>
                <EngineeringIcon />
                    <span>الموردين</span>
                </li>
                <li>
                    <DomainIcon />
                    <span>المحاجر</span>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar