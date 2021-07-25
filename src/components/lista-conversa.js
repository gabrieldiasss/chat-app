import React, {useState, useEffect} from 'react'

import './lista-conversa.css'

export default ({onClick, active, data}) => {

    const [time, setTime] = useState('');

    useEffect(() => {
        if(data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000 );
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }

    }, [data])

    return(
        <div className={`listaChat ${active? 'active' : ''}`} 
        
        onClick={onClick}
        
        >
            <img className="avatar" src={data.image}  alt="" />
            <div className="listaChat-lines">
                <div className="listaChat-line">
                    <div className="nome">{data.title}</div>
                    <div className="date">{time}</div>  
                </div>

                <div className="listaChat-line">
                    <div className="ultima"><p>{data.lastMessage}</p></div> 
                </div>

            </div>
        </div>
    )
}