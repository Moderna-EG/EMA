import React, { useState, useEffect } from 'react'
import './navbar.css'
import logo from '../../images/EMA logo.png'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import EngineeringIcon from '@mui/icons-material/Engineering'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import LogoutIcon from '@mui/icons-material/Logout'


const Navbar = () => {

    const [name, setName] = useState()
    const [hiddenMenu, setHiddenMenu] = useState(false)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'))
        setName(user.user.name)

        if(user.user.role === 'مالك') {
            setAuthorized(true)
        }

    },[])

    const toggleMenu = () => {
        
        if(hiddenMenu) {
            setHiddenMenu(false)
        } else {
            setHiddenMenu(true)
        }
    }


    return (
        <div className="navbar-container">
            <div className="navbar-section">
            <div className="navbar-left">
                <ul>
                    <li><img src={logo} style={{ width: '80px', height: 'auto', borderRadius: '50%' }} /></li>
                </ul>
            </div>
            <div className="navbar-right">
                <span className="account-name">{ name }</span>
                <span className="burger-menu" onClick={ e => toggleMenu()}>
                    <MenuIcon style={{ width: '2rem', height: '2rem' }} />
                </span>
                <img src={`https://avatars.dicebear.com/api/initials/${name}.svg`} className="account-photo" style={{ width: 40, height: 40, borderRadius: '50%' }}/>
            </div>
        </div>

        {
            hiddenMenu ?
            <div className="hidden-menu">
        <ul>
            <li>
                <NavLink to="/inventory/items">
                        <span>
                        اصناف
                        </span>
                        <ContentPasteIcon />
                </NavLink>
            </li>
            <li>
                <NavLink to="/inventory/receive-permissions">
                    <span>
                    استلام
                    </span>
                    <AddBusinessIcon />
                </NavLink>
            </li>
            <li>
                <NavLink to="/inventory/exchange-permissions">
                    <span>
                    صرف
                    </span>
                    <LocalShippingIcon />
                </NavLink>
            </li>
            <li>
                <NavLink to="/inventory/providers">
                    <span>
                    موردين
                    </span>
                    <AssignmentIndIcon />
                </NavLink>
            </li>
            <li>
                <NavLink to="/inventory/clients">
                    <span>
                    عملاء
                    </span>
                    <PeopleAltIcon />
                </NavLink>
            </li>
            {
                authorized ?
                <li>
                <NavLink to="/inventory/employees">
                    <span>
                    موظفيين
                    </span>
                    <EngineeringIcon />
                </NavLink>
            </li>
            :
            ''
            }
            <li>
                <NavLink to="/login" onClick={ e => localStorage.setItem('user', null)}>
                    <span>
                    خروج
                    </span>
                    <LogoutIcon />
                </NavLink>
            </li>
        </ul>
        </div>
        :
        ''
        }
        
        </div>
    )
}

export default Navbar