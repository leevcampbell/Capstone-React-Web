import React from 'react';

import { useNavigate } from 'react-router-dom';

import '../CSS/App.css';



function App() {

  const navigate = useNavigate();

  return (
    <div className="App">

      <h1>Welcome To Film-anthropist!</h1>
      <h2>Looking to host a film project and find collaborators? Sign up for a Premium Account here!</h2>

      <button onClick={()=> navigate('/signup/owner')}> Premium User Sign Up</button>

      <h2>Looking to find a film project to work on? Sign up for a Basic Account here!</h2>
      <button onClick={()=> navigate('/signup/user')}>Sign up with a free account</button>

      <h2>Already have an free account?</h2>
      <button onClick={()=> navigate('/login/users')}>Sign in</button>

      <h2>Already have a Premium account?</h2>
      <button onClick={()=> navigate('/login/owners')}>Sign in</button>
    
      
    </div>


  );


}
export default App;
