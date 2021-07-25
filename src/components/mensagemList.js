import React, {useState, useEffect} from 'react'

import './mensagemList.css'

export default ({data, user}) => {

    const [time, setTime] = useState('');

    useEffect(() => {
        if(data.date > 0) {
            let d = new Date(data.date.seconds * 1000 );
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }

    }, [data])

    return(
        <div className="mensagem-lines"
            style={{justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'}}
        >
            <div className="mensagemItem" 
                style={{backgroundColor: user.id === data.author ? '#fff' : '', 
                fontWeight: user.id === data.author ? '600' : '',  
                border: user.id === data.author ? '1px solid #dfdfdf' : ''
            }}   
            >
                <div className="apenas-mensagem" style={{color: user.id === data.author ? '#031325' : ''}}>{data.body} </div>
        <div className="hora">{time}</div>
            </div>
        </div>
    )
}