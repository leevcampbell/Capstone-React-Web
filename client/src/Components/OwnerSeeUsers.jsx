import React from 'react'
import OwnerNavBar from './OwnerNavBar'
import '../CSS/SeeUsers.css'
import '../CSS/neontext.css'

import { useState, useEffect } from 'react'


function OwnerSeeUsers() {


    const [matchedUsers, setMatchedUsers] = useState([])
    const [currentOwner, setCurrentOwner] = useState([])

   

    useEffect(() => {
        fetch('/owner-homepage')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCurrentOwner(data)
        })
    }, [])

    useEffect(() => {
        fetch('/owners/matches')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMatchedUsers(data)
        }
        )
    }, [])

    const mappedUsers = matchedUsers?.matches?.map(user => {
        return(
            <div className="user-card" key={user.id}>
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p>{user.location}</p>
                
            </div>
        )
    })

  return (
    <div>
        <OwnerNavBar />
        <h1 className='neonText'>Your Crews</h1>
        <div className="user-card-container">
            {mappedUsers}
        </div>

    </div>
  )
}

export default OwnerSeeUsers