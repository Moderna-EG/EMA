import React, { useState, useEffect } from 'react'
import './navbar.css'
import logo from '../../images/EMA logo.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'



const Navbar = () => {

    const [name, setName] = useState()

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'))

        setName(user.user.name)

    },[])


    return (
        <div className="navbar-container">
            <div className="navbar-section">
            <div className="navbar-left">
                <ul>
                    <li><img src={logo} style={{ width: '80px', height: 'auto', borderRadius: '50%' }} /></li>

                </ul>
            </div>
            <div className="navbar-right">
                <span>{ name }</span>
                <AccountCircleIcon />
            </div>
        </div>
        </div>
    )
}

export default Navbar