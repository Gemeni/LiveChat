import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Chatroom from './components/Chatroom.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    username: null
  }
    this.setUserName = this.setUserName.bind(this)
  }

  setUserName(name) {
    this.setState({
      username:name
    })
  }

  render() {
    return (
      <div >
        <Route exact path='/'>
          <Chatroom username={this.state.username}/>
        </Route>
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
