import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'


function OwnerHomepage({currentOwner, setCurrentOwner, newOwner, setNewOwner}) {


    const [ownerData, setOwnerData] = useState([])


    useEffect(() => {
        fetch('/owner-homepage')
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            setOwnerData(data)
        })
    }, [])

    const handleCollaborate = (e) => {
        e.preventDefault()

    }





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

        <button>
            {/* NEED TO MAKE CREATE PROJECT PAGE AND PUT ROUTE IN INDEX, ALREADY HAVE THIS ROUTE ON THE BACKEND */}
            <Link to='/match-page'>Host a Project!</Link>
        </button>
        <br></br>
        <br></br>
        <LogoutButton />
   

    </div>
  )







}
export default OwnerHomepage
