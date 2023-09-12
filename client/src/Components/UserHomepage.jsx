import React from 'react'
import { useState, useEffect } from 'react'

import freeUserPic from '../assets/user_profilepic.jpeg'
import '../CSS/Homepage.css'
import UserMenu from './UserMenu'


function UserHomepage({currentUser, setCurrentUser, newUser, setNewUser}) {


    const [userData, setUserData] = useState([])



    useEffect(() => {
        fetch('/user-homepage')
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            setUserData(data)
        })
    }, [])







  return (
    <div className="user-profile">
        <UserMenu />

        <div className="profile-card">
            <h2 className='neonText'>Welcome, {userData.name}</h2>
            <div className="profile-image">
                <img src={freeUserPic} alt="Profile Pic"/>
            </div>
            <div className="info-container-user">
                <p>Username: {userData.username}</p>
                <p>Location: {userData.location}</p>
                <p>Contact: {userData.email}</p>
                <p>Camera Equipment: {userData.camera ? '✅' : '⛔'}</p>
                <p>Editing Software: {userData.editing ? '✅' : '⛔'}</p>
                <p>Light Kit: {userData.lights ? '✅' : '⛔'}</p>
                <p>Audio Equipment: {userData.audio ? '✅' : '⛔'}</p>
                <p>Props: {userData.props ? '✅' : '⛔'}</p>
                <p>Bio: {userData.bio}</p>
            </div>

            

        </div>

       
       

        
        
    </div>
  )







}
export default UserHomepage
