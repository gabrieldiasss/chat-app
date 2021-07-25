import React, { useState, useEffect } from 'react'

import './App.css'

//IMAGENS
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// COMPONENTES
import ListaConversa from './components/lista-conversa.js'
import Introducao from './components/introducao.js'
import JanelaConversa from './components/janelaConversa.js'
import NovoChat from './components/NovoChat.js'
import Login from './components/login.js'
import Api from './Api.js'

export default () => {

	const [chatAtivo, setChatAtivo] = useState({})
	const [user, setUser] = useState(null)
 
	const [listaConversa, setLista] = useState([]) 

	const [novoChat, setNovoChat] = useState(false)

	useEffect(()=> {
		if(user !== null) {
			let unsub = Api.onChatList(user.id, setLista)
			return unsub
		}
	}, [user])

	const handleAbrir = () => {
		setNovoChat(true)
	}

	const handleLoginData = async (u) => {
		let newUser = {
			id: u.uid,
			name: u.displayName,
			avatar: u.photoURL
		}
		await Api.addUser(newUser)
		setUser(newUser)
	}

	if(user === null) {
		return (<Login onReceive={handleLoginData} />)
	}

	return(

		<div className="app">

			<div className="lateral">

				<NovoChat 
					user={user}
					novo={novoChat}
					setNovo={setNovoChat}
				/>

				<header>
					<div className="pre">
						<img className="imagem" src={user.avatar} alt="" />
					</div>

					<div  className="icones-pos" >

						<div className="cada-icones" onClick={handleAbrir} >
							<ChatBubbleIcon style={{color: '#e7ecf3'}} />
						</div>

						<div className="cada-icones">
							<MoreVertIcon style={{color: '#e7ecf3'}} />
						</div>
					</div>

					
				</header>

				<div className="mini-info">
					<div className="Recentes">
						Recentes
						<ArrowDropDownIcon style={{color: '#e7ecf3'}} />
					</div>

					<div className="Hora">
						Hora
						<ArrowDropDownIcon style={{color: '#e7ecf3'}} />
					</div>

				</div>

				<div className="lista-das-conversas">

					{listaConversa.map((item, key)=> (
						<ListaConversa
						data={item}
						active={chatAtivo.chatId === listaConversa[key].chatId}
						onClick={() => setChatAtivo(listaConversa[key])}
						/>
					))}

				</div>

			</div>

			<div className="conteudo-principal">
				{chatAtivo.chatId !== undefined &&
					<JanelaConversa
						user={user}
						data={chatAtivo}
					/>
				}

				{chatAtivo.chatId === undefined &&
					<Introducao
						user={user}
					/>
				}
				
			</div>

		</div>
	);
}


