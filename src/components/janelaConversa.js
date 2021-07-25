import React, {useState, useEffect, useRef} from 'react'

import './janelaConversa.css'
import EmojiPicker from 'emoji-picker-react'

import Api from '../Api'

//IMAGENS
import VideocamIcon from '@material-ui/icons/Videocam';
import CallIcon from '@material-ui/icons/Call';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

//COMPONENTES
import MensagemList from './mensagemList.js'

export default ({user, data}) => {

    const [mensagem, setMensagem] = useState([])

    const body = useRef()

    useEffect(() => {
        setMensagem([])

        let unsub = Api.onChatContent(data.chatId, setMensagem, setUsers)
        return unsub
    }, [data.chatId])

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, [mensagem]) 

    const [abrirEmoji, setAbrirEmoji] = useState(false)
    const [texto, setTexto] = useState('')
    const [imagem, setImagem] = useState(false)
    const [ouvindo, setOuvindo] = useState(false)
    const [users, setUsers] = useState([])

    const handleEmojiClick = (e, emojiObject) => {
        setTexto( texto + emojiObject.emoji)
    }

    const handleAbrirEmoji = () => {
        setAbrirEmoji(true)
        setImagem(true)
    }

    const handleFecharEmoji = () => {
        setAbrirEmoji(false)
        setImagem(false)
    }

    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13) {
            handleSendClick()
        }

    }

    const handleSendClick = () => {
        if(texto !== '') {
            Api.sendMessage(data, user.id, 'text', texto, users)
            setTexto('')
            setAbrirEmoji(false)
        }
    }



    let reconhecimento = null 
    let reconhecimentoDeVoz = window.SpeechRecognition || window.webkitSpeechRecognition

    if(reconhecimentoDeVoz !== undefined) {
         reconhecimento = new reconhecimentoDeVoz()
    }

    const handleMicClick = () => {
        if(reconhecimento !== null) {
            reconhecimento.onstart = () => {
                setOuvindo(true)
            }

            reconhecimento.onend = () => {
                setOuvindo(false)
            }

            reconhecimento.onresult = (e) => {
                setTexto(e.results[0][0].transcript)
            }

            reconhecimento.start()

        }
    }


    return(
        <div className="janelaConversa">
            <div className="header">

                <div className="header-info">
                    <img className="image" src={data.image} alt="" />
                    <div className="name">{data.title}</div>
                </div>

                <div className="botoes-header">

                    <div className="cada-botao">
                        <VideocamIcon style={{color: '#1b2547'}} />
                    </div>

                    <div className="cada-botao">
                        <CallIcon style={{color: '#1e2847'}} />
                    </div>

                    <div className="cada-botao">
                        <MoreVertIcon style={{color: '#1e2847'}} />
                    </div>

                </div>

            </div>

            <div ref={body} className="body">

                {mensagem.map((item, key) => (
                    <MensagemList 
                        key={key}
                        data={item}
                        user={user}
                    />
            ))}
    

            </div>

            <div className="Emoji-area" style={{height: `${abrirEmoji? '15rem' : '0rem' }` }} >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className="footer">
                
                
                <div className="footer-pre">

                    <div className="cada-botao-btn" onClick={handleFecharEmoji} style={{width: abrirEmoji? '2.4rem' : '0rem' }} >
                        <HighlightOffIcon  style={{color: '#1e2645'}}/>
                    </div>

                    {imagem === false && 
                    <div className="cada-botao-btn" onClick={handleAbrirEmoji}>
                            <InsertEmoticonIcon  style={{color: '#1e2645'}}/>
                    </div>
                    }

                    {imagem === true &&
                    <div className="cada-botao-btn" onClick={handleAbrirEmoji}>
                            <EmojiEmotionsIcon  style={{color: '#1e2645'}}/>
                    </div>
                    }

                        
                </div>

                <div className="input">
                    <input className="input-footer" type="text" placeholder="Digite alguma mensagem"
                        value={texto}
                        onChange={e=>setTexto(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                    
                </div>

                <div className="footer-pos">
                    {texto === '' &&  
 
                         <div onClick={handleMicClick} className="cada-botao-btn"  >
                             <MicIcon style={{color: ouvindo? '#1e2645' : '#202024'}} />
                         </div>   
                                           
                    }

                    {texto !== '' &&
                    <div className="cada-botao-btn">
                        <SendIcon onClick={handleSendClick} style={{color: '#1e2645'}} />
                    </div>
                    }

                </div>
                </div>
                
        </div>
    )
}   