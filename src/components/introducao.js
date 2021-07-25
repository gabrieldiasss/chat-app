import React from 'react'

import './introducao.css'
import Imagem from './chat-illustration.jpg'

export default ({user}) => {
    return(
        <div className="tudo">
                <img src={Imagem} alt="" />
                <div className="textos">
                    <h1>Olá {user.nome}, seja bem-vindo ao TalkApp. </h1>
                    <h2>Comece ou inicie uma conversa.</h2>
                </div>
                
        </div>
    )
}