import React from 'react'
import { useState, useEffect } from 'react'
import OwnerNavBar from './OwnerNavBar'
import '../CSS/Homepage.css'
import '../CSS/ProjectCard.css'

import ownerPic from '../assets/owneruser_profilepic.png'



function OwnerHomepage({currentOwner, setCurrentOwner, newOwner, setNewOwner}) {

  



    const [ownerData, setOwnerData] = useState({})
    const [projectList, setProjectList] = useState([])



    useEffect(() => {
        fetch('/owner-homepage')
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            setOwnerData(data)
            setProjectList(data.projects)
        })
    }, [])


    const handleProjectDelete = (id) => {
        console.log(id)
        console.log(ownerData)
        fetch(`/projects/delete/${id}`, {
          method: 'DELETE',
        })
        .then(setProjectList(projectList.filter(project => project.id !== id)))
      }

    const mappedProjects = projectList.map(project => {
        return(
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>{project.location}</p>
            <p>{project.genre}</p>
            <button onClick={() => handleProjectDelete(project.id)}>Delete Project</button>
          </div>
        )
      })





  return (
    <div className="owner-homepage">
        <OwnerNavBar />

        <div className="profile-card">
            <h2>Welcome, {ownerData.name}</h2>
            <div>
            <img className = "profile-image" src={ownerPic} alt="Profile Pic"/>
            </div>
            <div className = "info-container">
              <p>Username: {ownerData.username}</p>
              <p>Location: {ownerData.location}</p>
              <p>Contact: {ownerData.email}</p>
              <p>Experience: {ownerData.experience} </p>
              <p>Camera Equipment: {ownerData.camera === "1" ? '✅' : '⛔'}</p>
              <p>Editing Software: {ownerData.editing === "1" ? '✅' : '⛔'}</p>
              <p>Light Kit: {ownerData.lights === "1" ? '✅' : '⛔'}</p>
              <p>Audio Equipment: {ownerData.audio === "1" ? '✅' : '⛔'}</p>
              <p>Props: {ownerData.props === "1" ? '✅' : '⛔'}</p>
              <p>Bio: {ownerData.bio}</p>
            </div>
            <div>
            <p>Your Projects:</p>
                <div className='project-card-container'>
                    {mappedProjects}
                </div>
            </div>
        </div>

      

   

    </div>
  )







}
export default OwnerHomepage
