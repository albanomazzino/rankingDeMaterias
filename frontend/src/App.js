import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function App() {
const [ user, setUser ] = useState({});

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

    fetchUniversities(response.credential); // Envía el JWT como token
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  function fetchUniversities(token) {
    fetch('http://localhost:8222/api/v1/schools', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Universidades: ", data);
    })
    .catch(error => {
      console.error("Error fetching universities: ", error);
    });
  }

  useEffect(() => {
    /* global google gsi client */
    google.accounts.id.initialize({
      client_id:process.env.REACT_APP_GOOGLE_CLIENT_ID, 
      callback: handleCallBackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
         <button onClick ={ (e) => handleSignOut(e) }>Sign out</button>
      }

      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
