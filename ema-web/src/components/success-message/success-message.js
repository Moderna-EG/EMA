import React, { useState, useEffect } from 'react'
import './success-message.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const SuccessMessage = ({ message }) => {

    


    return (
        <>
        <div className="success-notification">
            <CheckCircleIcon style={{ color: '#FFF', borderRadius: '50%' }} />
            <p>{message}</p>
        </div>

        </>
    )
}

export default SuccessMessage