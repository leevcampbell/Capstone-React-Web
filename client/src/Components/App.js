import React from 'react';

import { useNavigate } from 'react-router-dom';

import '../CSS/App.css';



function App() {

  const navigate = useNavigate();

  return (
    <div className="App">

      <h1>MrKR</h1>
      <p>A one-stop shop for Indie and Guerilla Filmmakers</p>

      <h3>Basic User Login</h3>
      <button onClick={()=> navigate('/login/users')}>Sign in</button>

      <h3>Premium User Login</h3>
      <button onClick={()=> navigate('/login/owners')}>Sign in</button>

      <h3>Sign up for a Premium Account here to host a project!</h3>

      <button onClick={()=> navigate('/signup/owner')}> Premium User Sign Up</button>

      <h3> Sign up for a free Account here!</h3>
      <button onClick={()=> navigate('/signup/user')}>Free User Sign Up</button>

    
      
    </div>


  );


}
export default App;
