import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerNavBar from './OwnerNavBar'
import '../CSS/neontext.css'

function CreateProject() {

  const [projectData, setProjectData] = useState([])
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [projectGenre, setProjectGenre] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: projectTitle,
        description: projectDescription,
        location: projectLocation,
        genre: projectGenre
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setProjectData(data)
    }
    )
    navigate('/owner-homepage')

  }

  const handleProjectNameChange = (e) => {
    setProjectTitle(e.target.value)
  }

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value)
  }

  const handleProjectLocationChange = (e) => {
    setProjectLocation(e.target.value)
  }

  const handleProjectGenreChange = (e) => {
    setProjectGenre(e.target.value)
  }

 
    
  







  return (
    <div className='create-project-form'>
      <OwnerNavBar />
      <h1 className='neonText'>Create a Project</h1>
      <form value={projectData} onSubmit={handleSubmit}>
          <label>Project Name</label>
          <br></br>
          <br></br>
          <input type="text" name="projectName" placeholder="Project Name" value={projectTitle} onChange={handleProjectNameChange}/>
          <br></br>
          <br></br>
          <label>Project Description</label>
          <br></br>
          <br></br>
          <textarea name='projectDescription' placeholder='Describe your project' rows="4" cols="50" value={projectDescription} onChange={handleProjectDescriptionChange}></textarea>
          <br></br>
          <br></br>
          <label>Project Location</label>
          <br></br>
          <br></br>
          <input type="text" name="projectLocation" placeholder="Project Location" value={projectLocation} onChange={handleProjectLocationChange} />
          <br></br>
          <br></br>
          <label>Project Genre</label>
          <br></br>
          <br></br>
          <input type="text" name="projectGenre" placeholder="Project Genre" value={projectGenre} onChange={handleProjectGenreChange}/>
          <br></br>
          <br></br>
          
          <button type="submit">Create Project

          </button>
        </form>
    </div>
  )
}

export default CreateProject