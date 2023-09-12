import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/neontext.css'
import '../CSS/buttons.css'

import '../CSS/App.css';



function App() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/login/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCurrentUser(data); 
                navigate('/user-homepage')
            })
            
        }

        const handleUsernameChange = (e) => {
          setUsername(e.target.value)
      }
  
      const handlePasswordChange = (e) => {   
          setPassword(e.target.value)
      }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='neonText'>MrKR</h1>
        <p className='neonText'>A one-stop shop for Indie and Guerilla Filmmakers</p>
      </header>

      <form onSubmit={handleSubmit}>
        <h3 className='neonText'>User Login</h3>
            <input type="text" placeholder="Username" value={username}onChange={handleUsernameChange} />
            <br></br>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <br></br>
            <button classname= 'button-design' type="submit">
                Login
            </button>
      </form>

      <button onClick={()=> navigate('/login/owners')}>Premium User Login</button>

      <button onClick={()=> navigate('/signup/user')}>Sign Up for a free account here</button>

      <button onClick={()=> navigate('/signup/owner')}> Sign Up for a premium account here</button>
      


    
      
    </div>


  );


}
export default App;
