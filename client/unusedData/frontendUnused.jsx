// *********** APP.JSX ******** //
  // // when the component first mounts,
  // // send a fetch request to the back end
  // // see if the current user has a cookie session
  // // if they do, redirect to main page
  // // if they don't, redirect to login 
  // componentDidMount() {
  //   const { push } = useHistory();
  //   // as soon as the page loads,
  //   // send fetch request to see if
  //   fetch('/api/isLoggedIn', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((isSignedIn) => {
  //     // current user isLoggedIn
  //     // if they are, display Main.jsx
  //     if(isSignedIn) push('/main');
  //     // if not, direct them to the login page
  //     push('/login');
  //   })
  // }


// *********** MAIN.JS return *******  => Chatroom.jsx//

// const textbox = document.querySelector('.message');
//                             textbox.value = '';

//*****************LOGIN */
// handleChange(event, key) {
 
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     [key]: event.target.value,
  //   }));
  // }

  //******************SIGNUP */
              // const { isLoggedIn } = data;
            // if isLogged in is true, redirect to main page
            // if (isLoggedIn) return push('/chatroom');
            // else, redirect to login
            // return push('/login');