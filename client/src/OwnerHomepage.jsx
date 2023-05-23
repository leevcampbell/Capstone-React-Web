import React from 'react'
import { useState, useEffect } from 'react'


function OwnerHomepage({newOwner, ownerUser}) {


    const [ownerData, setOwnerData] = useState([])


    useEffect(() => {
        fetch('/owner-homepage')
        .then(response => response.json())
        .then(data => { 
            setOwnerData(data)
        })
    }, [])





  return (
    <div className="user-profile">
        <div className="profile-card">
            <h2>Welcome, {ownerData.name}</h2>
            <div>
            <img src={ownerData.image} alt="Profile Pic"/>

            </div>
            <p>{ownerData.username}</p>
            <p>Location: {ownerData.location}</p>
            <p>Member since: {ownerData.created_at}</p>
            <p>Camera Equipment: {ownerData.camera}</p>
            <p>Editing Software: {ownerData.editing}</p>
            <p>Light Kit: {ownerData.lights}</p>
            <p>Audio Equipment: {ownerData.audio}</p>
            <p>Props: {ownerData.props}</p>
            <p>Bio: {ownerData.bio}</p>
            <p>Projects: {ownerData.projects}</p>

        </div>
   

    </div>
  )







}
export default OwnerHomepage
