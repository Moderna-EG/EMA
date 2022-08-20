import React from 'react'
import './update-message.css'

const UpdateMessage = ({ message, setErrorMessage }) => {


    return (
        <>
        <div className="update-message" onClick={ e => setErrorMessage() }>
            <p>{message}</p>
        </div>
        </>
    )
}

export default UpdateMessage