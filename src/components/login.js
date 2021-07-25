import React from 'react'
import Api from '../Api.js'
import './login.css'


export default ({onReceive}) => {
    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup()
        if(result) {
            onReceive(result.user)
        } else {
            alert("Erro!")
        }
    }

    return (
        <div className="Login">
            <div className="section">
                <button className="myButton" onClick={handleFacebookLogin}>Logar Facebook</button>
            </div>
        </div>
    )
}