import React from 'react'
import { useState, useEffect } from 'react'
import LogoutButton from './LogoutButton'


function UserHomepage({currentUser, setCurrentUser, newUser, setNewUser}) {


    const [userData, setUserData] = useState([])



    useEffect(() => {
        fetch('/user-homepage')
        .then(response => response.json())
        .then(data => { 
            setUserData(data)
        })
    }, [])







  return (
    <div className="user-profile">
        <h1>{userData.name} Homepage</h1>

        <div className="profile-card">
            <h2>Welcome, {userData.name}</h2>
            <div className="profile-image">
                <img src={userData.image} alt="Profile Pic"/>
            </div>
            <div className="profile-details">
                <p>{userData.username}</p>
                <p>Location: {userData.location}</p>
                <p>Camera Equipment: {userData.camera}</p>
                <p>Editing Software: {userData.editing}</p>
                <p>Light Kit: {userData.lights}</p>
                <p>Audio Equipment: {userData.audio}</p>
                <p>Props: {userData.props}</p>
                <p>Bio: {userData.bio}</p>
            </div>

            

        </div>

        <button>
            <a href='/match-page'>Find a Project!</a>
        </button>
   
        <LogoutButton />
    </div>
  )







}
export default UserHomepage
