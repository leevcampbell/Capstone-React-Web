import React from 'react'
import { useState, useEffect } from 'react'


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
        <div className="profile-card">
            <h2>Welcome, {userData.name}</h2>
            <div className="profile-image">
                <img src={userData.image} alt="Profile Pic"/>
            </div>
            <div className="profile-details">
            <p>{userData.username}</p>
            <p>Location: {userData.location}</p>
            <p>Member since: {userData.created_at}</p>
            <p>Camera Equipment: {userData.camera}</p>
            <p>Editing Software: {userData.editing}</p>
            <p>Light Kit: {userData.lights}</p>
            <p>Audio Equipment: {userData.audio}</p>
            <p>Props: {userData.props}</p>
            <p>Bio: {userData.bio}</p>
            

            </div>

        </div>
   

    </div>
  )







}
export default UserHomepage
