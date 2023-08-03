import React from 'react'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import '../CSS/matchpage.css'
import '../CSS/ProjectCard.css'
import UserMenu from './UserMenu'

function UserSeeProjects() {

    const [matchedProjects, setMatchedProjects] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    console.log(currentUser)

    // const navigate = useNavigate()

    useEffect(() => {
        fetch('/user-homepage')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCurrentUser(data)
        })
        .catch(error => console.error('Error fetching user data', error));
    }, [])

    useEffect(() => {
        fetch('/projects/matches')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => { 
            console.log(data)
            setMatchedProjects(data)
        })
        .catch(error => console.error('Error fetching projects', error));
        
    }, [])

    const mappedProjects = matchedProjects?.matches?.map(project => {
        console.log(project)
        return(
            <div className="project-card" key={project.id}>
                <h2>{project.project.title}</h2>
                <img className= 'project-image'src={project.project.image} alt="Project Pic"/>
                <p>{project.project.description}</p>
                <p>{project.project.location}</p>
                <p>{project.project.genre}</p>
            </div>
        )
    })


return (
    <div>
        <h1>Projects You Want To Work On</h1>
        <UserMenu />

        
        <div className='project-card-container'>
            {mappedProjects}
        </div>
        

    </div>
)
}

export default UserSeeProjects