import React, {Fragment} from 'react'
import {useHistory} from 'react-router-dom';

// TODO Finish 'login' functionality (just pass username to the server)
const LoginPage = () => {
    const history = useHistory();

    const onSubmit = () => {
        console.log('CLicked');
        history.push('/chat');
    };

    return (
        <Fragment>
            <h3>Chat App</h3>
            <label htmlFor='username-input'>Username: </label>
            <input id='username-input' type='text'/>
            <button onClick={onSubmit}>Join</button>
        </Fragment>
    )
}

export default LoginPage;