import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function UserLogin(props) {

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
                }
                .then(response => response.json())
                .then(data => {
                    setCurrentUser(data);  
                })
                
            )}
        

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {   
        setPassword(e.target.value)
    }
            




  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>User Login</h1>
            <input type="text" placeholder="Username" onChange={handleUsernameChange} />
            <input type="password" placeholder="Password" onChange={handlePasswordChange} />
            <button type="submit">
                <Link to="/user-homepage">Login</Link>
            </button>
        </form>

        <h3>Premium member login</h3>
        <button onClick={() => props.onLoginSwitch('ownerLogin')}>Owner Login</button>
    </div>
    )

}

export default UserLogin