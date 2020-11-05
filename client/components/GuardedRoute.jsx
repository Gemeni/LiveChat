import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, username, path, setUserName }) => {
    console.log("auth:" + username, "path:", path);
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