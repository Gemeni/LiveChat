import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Chatroom from './components/Chatroom.jsx';
import GuardedRoute from './components/GuardedRoute.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    username: null
  }
    this.setUserName = this.setUserName.bind(this)
  }

//set a username to login and change it to 'null' if user logout
  setUserName(name) {
    console.log("name:", name);
    if (!name) {
      this.setState({
        username:null
      })
    } else {
      this.setState({
        username:name
      })
    }  
  }

  render() {
    return (
      <div >
        <GuardedRoute path='/' component={Chatroom} username={this.state.username} setUserName={this.setUserName}/>
        <Route exact path='/login' >
          <Login onLogin={this.setUserName}/>
        </Route>
        <Route path='/signup'>
          <SignUp onLogin={this.setUserName}/>
        </Route>
      </div>
    )
  }
}

export default App;
