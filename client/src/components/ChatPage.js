import React, {Fragment, useEffect, useState} from 'react'
import {Message} from "./Message";

const ws = new WebSocket('ws://localhost:3030');    // TODO dev/prod environment URL

// TODO messaging, message history display, etc
const ChatPage = () => {

    const [messages, updateMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    const addMessage = message => {
        updateMessages([...messages, message]);
        console.log(messages);
    };

    const handleSend = (e) => {
        ws.send(JSON.stringify(message))
        addMessage(message);
    };

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            addMessage(message)
            console.log(messages);
        }

        ws.onclose = () => {
            console.log('disconnected')
        }
    }, []);

    return (
        <Fragment>
            <h3>Chat Room</h3>
            <Fragment id='chat-area'>
                {messages.map(m => {
                    return <Message dateTime={'currenttime'} message={m} username={'sender'}/>
                })}
            </Fragment>
            <br/>
            <input onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={handleSend}>Send</button>
        </Fragment>
    );
}

export default ChatPage;