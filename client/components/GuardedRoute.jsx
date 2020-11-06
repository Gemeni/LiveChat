import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, username, path, setUserName }) => {
    // if the user is logged in redirect to the chatroom and pass on props
    // otherwise redirect to login page
    return (
        <Route path={path} render={(props) => (
            username !== null
                ? <Component username={username} path={path} onClick={setUserName}/>
                : <Redirect to='/login' />
        )}
        />
    )
}

export default GuardedRoute;