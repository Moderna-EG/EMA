import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import './success.css'
const SuccessModal = ({ closeModal, message }) => {


    return (
        <div className="success-container" onClick={e => closeModal()}>
        <div className="success-wrapper">
            <div className="success-message">
                <div className="success-message-icon">
                    <CheckCircleIcon style={{fontSize: '7rem'}}/>
                </div>
                <p>
                    { message }
                </p>
            </div>
        </div>
    </div>
    )
}

export default SuccessModal