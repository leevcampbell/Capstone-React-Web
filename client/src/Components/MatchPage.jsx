import React from 'react'
import { useState, useEffect } from 'react'
import '../CSS/matchpage.css'
import UserMenu from './UserMenu'


function MatchPage() {

    const [projects, setProjects] = useState([])

    

    useEffect(() => {
        fetch('/projects')
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            setProjects(data.projects)
        })
        
    }, [])


    const handleLike = (project) => {
        fetch('/match-page', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify(
                {
                    project_id: project.id,
                    users: project.users
                }
            ) 
            }
        
        
        )
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                }
                )
        
    }
        


    const mappedProjects = projects.map(project => {
            return(
            <div className="project-card-match-page" key={project.id}> 
                <h2>{project.title}</h2>
                <img className= 'project-image'src={project.image} alt="Project Pic"/>
                <p>{project.description}</p>
                <p>{project.location}</p>
                <p>{project.genre}</p>
                <button onClick={ () => handleLike(project) }>Like</button>
                </div>

                
            )
        }
        )
    


  return (
    <div className='project-container'>
        <h1 className='header'>Projects To Collaborate On</h1>
        <UserMenu />
        <div className='displayed-projects-for-users' >
            {mappedProjects}
        </div>

    </div>
  )
}

export default MatchPage

