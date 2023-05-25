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
        <LogoutButton />      
      </nav>
        
    </div>
  )
}

export default OwnerNavBar