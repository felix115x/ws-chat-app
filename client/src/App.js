import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import {RestrictedRoute} from "./components/RestrictedRoute";

import './App.css';

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    async function onLoad() {
        try {
            //await Auth.currentSession();
            userHasAuthenticated(true);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(async () => {
        await onLoad();
    }, []);

    console.log(isAuthenticated);

    return (
        <BrowserRouter>
            <Fragment className="App">
                <Switch>
                    <Route exact path='/' component={LoginPage}/>
                    <RestrictedRoute path='/chat' component={ChatPage} appProps={{isAuthenticated: isAuthenticated}} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;
