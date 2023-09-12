import React from 'react'
import { useState, useEffect } from 'react'
import '../CSS/EditInfo.css'
import { useNavigate } from 'react-router-dom'
import OwnerNavBar from './OwnerNavBar'
import '../CSS/neontext.css'


function EditOwnerInfo() {

    

    const [ownerCamera, setownerCamera] = useState(false)
    const [ownerLights, setownerLights] = useState(false)
    const [ownerAudio, setownerAudio] = useState(false)
    const [ownerEditing, setownerEditing] = useState(false)
    const [ownerProps, setownerProps] = useState(false)
    const [ownerBio, setownerBio] = useState('')
    const [ownerEmail, setownerEmail] = useState('')
    const [ownerLocation, setownerLocation] = useState('')
    const [ownerExperience, setownerExperience] = useState('')

    const [editedOwner, setEditedOwner] = useState({})

    const navigate = useNavigate()


    useEffect(() => {
        fetch('/owner-homepage')
        .then(response => response.json())
        .then(data => {
            setEditedOwner(data)
        })
    }, []
    )



    

    const handleBio = (e) => {
        setownerBio(e.target.value)
    }

    const handleEmail = (e) => {
        setownerEmail(e.target.value)
    }

    const handleLocation = (e) => {
        setownerLocation(e.target.value)
    }

    const handleExperience = (e) => {
        setownerExperience(e.target.value)
    }

   


 

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const ownerId = editedOwner.id
        console.log(ownerId)
        fetch(`/owners/edit/${ownerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify({
                camera: ownerCamera,
                lights: ownerLights,
                audio: ownerAudio,
                editing: ownerEditing,
                props: ownerProps,
                bio: ownerBio,
                location: ownerLocation,
                experience: ownerExperience

            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        e.target.reset()
        navigate('/owner-homepage')
    }

    const toggleCamera = () => {
        setownerCamera(!ownerCamera)
        console.log(ownerCamera)
    }

    const toggleLights = () => {
        setownerLights(!ownerLights)
        console.log(ownerLights)
    }

    const toggleAudio = () => {
        setownerAudio(!ownerAudio)
        console.log(ownerAudio)
    }

    const toggleEditing = () => {
        setownerEditing(!ownerEditing)
    }

    const toggleProps = () => {
        setownerProps(!ownerProps)
    }







  return (
    <div className='edit-info-page'>
        <OwnerNavBar />
        <h3 className='neonText'>Edit Your Info</h3>
        <form className='edit-info-form' onSubmit={handleEditSubmit}>
            <h3 className='neonText'>Kit Options</h3>
            <div className='kit-option-checkbox'>
                <p className='neonText'>Camera Equipment</p>
                <input type='checkbox'  onChange={toggleCamera} placeholder='Camera Equipment' />
                <br></br>
                <p className='neonText'>Lighting Equipment</p>
                <input type='checkbox'  onChange={() => setownerLights(!ownerLights)} placeholder='Lighting Equipment' />
                <br></br>
                <p className='neonText'>Audio Equipment</p>
                <input type='checkbox'  onChange={() => setownerAudio(!ownerAudio)} placeholder='Audio Equipment' />
                <p className='neonText'>Editing Software</p>
                <input type='checkbox' onChange={() => setownerEditing(!ownerEditing)} placeholder='Editing Software' />
                <br></br>
                <p className='neonText'>Props</p>
                <input type='checkbox'  onChange={() => setownerProps(!ownerProps)} placeholder='Props' />
            </div>
            <h3 className='neonText'>Location</h3>
            <input type='text' value={ownerLocation} onChange={handleLocation} placeholder='Location' />
            <h3 className='neonText'>Experience</h3>
            <input type='integer' placeholder='Experience' value={ownerExperience} onChange={handleExperience}/>   
            <h3 className='neonText'>Bio</h3>
            <textarea name='bio' placeholder='Describe yourself' rows="4" cols="50" value={ownerBio} onChange={handleBio}></textarea>
            <br></br>
            <button type='submit'>Submit</button>
        </form>



    </div>
  )
}

export default EditOwnerInfo