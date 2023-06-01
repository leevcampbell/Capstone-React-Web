import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'

function UserMenu() {

    const navigate = useNavigate()



  return (
    <div className='user-menu'>
        <nav>
            <button onClick={() => navigate('/user/edit')}>Edit Your Info</button>
            <button onClick={() => navigate('/projects/matches')}>View Projects You Liked</button>
            <button onClick={() => navigate('/match-page')}>Find Projects</button>
            <LogoutButton />
            

        </nav>

    </div>
  )
}

export default UserMenu