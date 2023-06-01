import React from 'react';

import { useNavigate } from 'react-router-dom';

import '../CSS/App.css';



function App() {

  const navigate = useNavigate();

  return (
    <div className="App">

      <h1>Welcome To Film-anthropist!</h1>
      <h3>Sign up for a Premium Account here to host a project!</h3>

      <button onClick={()=> navigate('/signup/owner')}> Premium User Sign Up</button>

      <h3> Sign up for a free Account here!</h3>
      <button onClick={()=> navigate('/signup/user')}>Free User Sign Up</button>

      <h3>Already have an free account?</h3>
      <button onClick={()=> navigate('/login/users')}>Sign in</button>

      <h3>Already have a Premium account?</h3>
      <button onClick={()=> navigate('/login/owners')}>Sign in</button>
    
      
    </div>


  );


}
export default App;
