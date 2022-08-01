import React, { useState, useEffect } from 'react'
import './update-message.css'
import CloseIcon from '@mui/icons-material/Close'

const UpdateMessage = ({ message }) => {

    const [show, setShow] = useState(true)



    return (
        <>
        { show ? 
        <div className="update-message" onClick={ e => setShow(false) }>
            <p>{message}</p>
        </div>
        :
        ''
        }

        </>
    )
}

export default UpdateMessage