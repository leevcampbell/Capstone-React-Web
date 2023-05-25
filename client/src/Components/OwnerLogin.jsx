import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function OwnerLogin() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentOwner, setCurrentOwner] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/login/owners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                    })
                }
        )
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCurrentOwner(data)
                })
                }
                
            
        

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {   
        setPassword(e.target.value)
    }
            




  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Premium Login</h1>
            <input type="text" placeholder="Username" onChange={handleUsernameChange} />
            <br></br>
            <input type="password" placeholder="Password" onChange={handlePasswordChange} />
            <br></br>
            <button type="submit">
                <Link to="/owner-homepage">Login</Link>
            </button>
        </form>

        <h3>Not a premium member? Login to you free account here</h3>
        <button>
            <Link to="/login/users">User Login</Link>
        </button>
    </div>
  )








}

export default OwnerLogin
