import React, {Fragment} from 'react'

export const Message = ({dateTime, username, message}) => {
    return (
        <Fragment>
            <strong>{username}</strong>
            <p>{dateTime}: {message}</p>
        </Fragment>
    );
}