import React, { useState, useEffect } from 'react'

import './NovoChat.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Api from '../Api'


export default ({user, novo, setNovo}) => {

    const [lista, setLista] = useState([])

    useEffect(() => {
        const getList = async () => {
            if(user !== null) {
                let results = await Api.getContactList(user.id)
                setLista(results)
            }
        }
        getList()
    }, [user])

    const addNewChat = async (user2) => {
         await Api.addNewChat(user, user2)

        handleFechar()
    }

    const handleFechar = () => {
        setNovo(false)
    }

    return(
        <div className="NovoChat" style={{left: novo? 0:-500 }} >
            <div className="NovoChat-header">
                <div className="NovoChat-botao" onClick={handleFechar}><ArrowBackIcon style={{color: '#e7ecf3'}} /></div>
                <div className="NovoChat-titulo">Nova Conversa</div>
            </div>

                <div className="NovoChat-lista">
                    {lista.map((item, key) => (
                        <div onClick={()=>addNewChat(item)} className="NovoChat-Item" key={key} >
                            <img className="NovoChat-avatar" src={item.avatar} alt=""/>
                            <div className="NovoChat-nome">{item.name}</div>
                        </div>
                            
                    ))}
                </div>
        </div>
    )
}