import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'



function SignupUser(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [newUser, setNewUser] = useState('')
    
    


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, username, email, password, location)
        fetch('/signup/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            
                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                    location: location
                    })
                })
                .then(response => response.json())
                .then(data => {
                    setNewUser(data);
                    
                })
              } 
  

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }



        
  return (
    <div>
      <h1>User Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <h3 className='SUheader'>Name</h3>
          <input value= {name} type="text" className='SUinput' placeholder='Your Full Name' onChange={handleNameChange}></input>
          <br></br>
        <h3 className='SUheader'>Username</h3>
          <input type="text" className='SUinput' placeholder='Username' value={username} onChange={handleUsernameChange}></input>
          <br></br>
        <h3 className='SUheader'>Email</h3>
          <input type="email" className='SUinput' placeholder='youremail@example.com' value={email} onChange={handleEmailChange}></input>

        <h3 className='SUheader'>Password</h3>

          <input type="password" className='SUinput' placeholder='*************' value={password} onChange={handlePasswordChange}></input>
          <br></br>

        <h3 className='SUheader'>Location</h3>
          <input type="text" className='SUinput' placeholder='City, State' onChange={handleLocationChange}></input>
          <br></br>
          <button type="submit" className='SUbutton'>
            <Link to='/user-homepage'>Sign Up</Link>
          </button>
      </form>

      <br></br>

      <h3 className='SUheader'>Looking to host your project?</h3>
    
      <button className='SUbutton' onClick={() => props.onFormSwitch('signupOwner')}>Sign up for a premium account here!</button>
        
    </div>
  )



}
export default SignupUser;