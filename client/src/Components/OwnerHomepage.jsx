import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import OwnerNavBar from './OwnerNavBar'


function OwnerHomepage({currentOwner, setCurrentOwner, newOwner, setNewOwner}) {


    const [ownerData, setOwnerData] = useState({})
    const [projectData, setProjectData] = useState([])



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
    const handleProjectDelete = () => {
        const projectId = ownerData.projects[0].id
        console.log(projectId)
        console.log(ownerData)
        fetch(`/projects/delete/${projectId}`, {
          method: 'DELETE',
        }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProjectData(data)
        }
        )
      }

    const mappedProjects = ownerData?.projects?.map(project => {
        return(
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>{project.location}</p>
            <p>{project.genre}</p>
            <button onClick={handleProjectDelete}>Delete Project</button>
          </div>
        )
      })





  return (
    <div className="user-profile">
        <OwnerNavBar />
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
            <p>Projects:</p>
                <div className='project-card-container'>
                    {mappedProjects}
                </div>
        </div>

      

   

    </div>
  )







}
export default OwnerHomepage
