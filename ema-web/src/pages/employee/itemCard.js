import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/EmployeeSidebar'
import ItemCardTable from '../../components/tables/itemCard'
import './employee.css'
import SideMenuIcons from '../../components/sideMenuIcons/SideMenuIcons'


const ItemCard = () => {

    const [showModal, setShowModal] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)


    return (
        <div>
            <Navbar />
            <div className="employee-main">
                <div className="employee-wrapper item-card-table">
                    <div className="side-bar">
                        <SideMenuIcons />
                    </div>
                    <div>
                        <ItemCardTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemCard