import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'



export default function LogoutButton({currentUser, setCurrentUser}) {

    const [loggedOut, setLoggedOut] = useState(false)

    const navigate = useNavigate()

   

    const handleLogout = (currentUser) => {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            setLoggedOut(data) 
          }
        )
        navigate('/')

    }






  return (
    <div>
        <button onClick={handleLogout} value={loggedOut}>Logout</button>
    </div>
  )

}
