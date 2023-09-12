import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/neontext.css'
import '../CSS/buttons.css'




function UserLogin() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState('')

    const navigate = useNavigate()
    



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

    const handleClick = (e) => {
        navigate('/login/owners')
    }
            




  return (
    <div>

        

        <form onSubmit={handleSubmit}>
            <h1 className='neonText'>User Login</h1>
            <input type="text" placeholder="Username" value={username}onChange={handleUsernameChange} />
            <br></br>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <br></br>
            <button className = 'buttonDesign' type="submit">
                Login
            </button>
        </form>

        <h3 className='neonText'>Premium member login</h3>
        <button onClick={handleClick}>
            Owner Login
        </button>
    </div>
    )

}

export default UserLogin