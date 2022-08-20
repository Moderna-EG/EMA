import React from 'react'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import './unauthorized.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

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