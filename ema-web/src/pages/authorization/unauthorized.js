import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import './unauthorized.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/SideBar'

const UnauthorizedPage = () => {

    return (
        <div className="unauthorized-page">
            <Navbar />
            <Sidebar />
            <div className="unauthorized-page-container">
                <div>
                    <PersonOffIcon style={{ width: '10rem', height: '10rem', color: '#DC3545' }}/>
                </div>
                <div>
                    <p className="unauthorized-message">
                ليس هناك اذن لعرض البينات    
                    </p>
                </div>
            </div>
        </div>
    )
}
export default UnauthorizedPage