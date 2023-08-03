import React from 'react'
import { useState, useEffect } from 'react'
import '../CSS/EditInfo.css'
import { useNavigate } from 'react-router-dom'
import UserMenu from './UserMenu'


function EdituserInfo() {

    

    const [userCamera, setUserCamera] = useState(false)
    const [userLights, setUserLights] = useState(false)
    const [userAudio, setUserAudio] = useState(false)
    const [userEditing, setUserEditing] = useState(false)
    const [userProps, setUserProps] = useState(false)
    const [userBio, setUserBio] = useState('')
   
    const [userLocation, setUserLocation] = useState('')
    const [userExperience, setUserExperience] = useState('')

    const [editedUser, setEditedUser] = useState({})
   

    const navigate = useNavigate()


    useEffect(() => {
        fetch('/user-homepage')
        .then(response => response.json())
        .then(data => {
            setEditedUser(data)
        })
    }, []
    )



    

    const handleBio = (e) => {
        setUserBio(e.target.value)
    }



    const handleLocation = (e) => {
        setUserLocation(e.target.value)
    }

    const handleExperience = (e) => {
        setUserExperience(e.target.value)
    }

   


 

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const userId = editedUser.id
        console.log(editedUser)
        console.log(userId)
        fetch(`/users/edit/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify({
               
                camera: userCamera,
                lights: userLights,
                audio: userAudio,
                editing: userEditing,
                props: userProps,
                bio: userBio,
                location: userLocation,
                experience: userExperience

            })
        })
        .then(response => response.json())
        .then(data => {
            setEditedUser(data)
        })
        e.target.reset()
        navigate('/user-homepage')
    }

    const toggleAudio = () => {
        setUserAudio(!userAudio)
        console.log(userAudio)
    }

    const toggleCamera = () => {
        setUserCamera(!userCamera)
        console.log(userCamera)
    }

    const toggleEditing = () => {
        setUserEditing(!userEditing)
        console.log(userEditing)
    }

    const toggleLights = () => {
        setUserLights(!userLights)
        console.log(userLights)
    }

    const toggleProps = () => {
        setUserProps(!userProps)
        console.log(userProps)
    }






  return (
    <div className='edit-info-page'>
        <h3>Edit Your Info</h3>
        <UserMenu />
        <form className='edit-info-form' onSubmit={handleEditSubmit}>
           
            <h3>Kit Options</h3>
            <div className='kit-option-checkbox'>
                <p>Camera Equipment</p>
                <input type='checkbox'  onChange={toggleCamera} placeholder='Camera Equipment' />
                
                <br></br>
                <p>Lighting Equipment</p>
                <input type='checkbox'  onChange={toggleLights} placeholder='Lighting Equipment' />
                <br></br>
                <p>Audio Equipment</p>
                <input type='checkbox'  onChange={toggleAudio} placeholder='Audio Equipment' />
                <p>Editing Software</p>
                <input type='checkbox' onChange={toggleEditing} placeholder='Editing Software' />
                <br></br>
                <p>Props</p>
                <input type='checkbox'  onChange={toggleProps} placeholder='Props' />
            </div>
            <h3>Location</h3>
            <input type='text' value={userLocation} onChange={handleLocation} placeholder='Location' />
            <h3>Experience</h3>
            <input type='integer' placeholder='Experience' value={userExperience} onChange={handleExperience}/>   
            <h3>Bio</h3>
            <textarea name='bio' placeholder='Describe yourself' rows="4" cols="50" value={userBio} onChange={handleBio}></textarea>
            <br></br>
            <button type='submit'>Submit</button>
        </form>



    </div>
  )
}

export default EdituserInfo