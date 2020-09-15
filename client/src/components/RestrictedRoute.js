import React from 'react'
import {Route, Redirect} from 'react-router-dom';

export const RestrictedRoute = ({component: C, appProps, ...rest}) => {
    console.log('Restricted: ' + appProps);
    return (
        <Route
            {...rest}
            render={props =>
                appProps.isAuthenticated
                    ? <C {...props} {...appProps} />
                    : <Redirect to={`/?redirect=${props.location.pathname}${props.location.search}`}/>}
        />
    );
}