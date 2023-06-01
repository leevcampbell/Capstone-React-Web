import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'

function OwnerNavBar() {

  const navigate = useNavigate()



  return (
    <div>
      <nav>
        <button onClick={() => navigate('/owner-homepage')}>Homepage</button>
        <button onClick={() => navigate('/projects/create')}>Create Project</button>
        <button onClick={() => navigate('/owner/edit')}>Edit Your Info</button>
        <button onClick={() => navigate('/owner/collaborate')}>Your Crews</button>

        <LogoutButton />      
        
      </nav>
        
    </div>
  )
}

export default OwnerNavBar