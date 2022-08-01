import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import './no-item.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const NoItemPage = () => {


    return (
        <div className="no-item-page">
            <Navbar />
            <Sidebar />
            <div className="no-item-page-container">
                <div>
                    <ProductionQuantityLimitsIcon style={{ width: '10rem', height: '10rem', color: '#DC3545' }}/>
                </div>
                <div>
                    <p className="no-item-message">
                        ليس هناك صنف للعرض      
                   </p>
                </div>
            </div>
        </div>
    )
}
export default NoItemPage