import React from 'react';
import { useState } from 'react';
// import SignupUser from './SignupUser';
// import SignupOwner from './signupOwner';
// import UserHomepage from './UserHomepage';
// import OwnerLogin from './OwnerLogin';
// import UserLogin from './UserLogin';
import './App.css';
// import OwnerHomepage from './OwnerHomepage';
import { Link } from 'react-router-dom';

function App() {

  const [currentForm, setCurrentForm] = useState('signupUser');
  const [loggedOut, setLoggedOut] = useState(false);
  

 
 











  return (
    <div className="App">

      <h1>Welcome To Film-anthropist!</h1>
      <h2>Looking to host a film project and find collaborators? Sign up for a Premium Account here!</h2>
      <button>
        <Link to="/signup/owner">Sign up as a Premium User</Link>
      </button>

      <h2>Looking to find a film project to work on? Sign up for a Basic Account here!</h2>
      <button>
        <Link to="/signup/user">Sign up with a free account</Link>
      </button>

      <h2>Already have an free account?</h2>
      <button>
        <Link to="/login/users">Sign in</Link>
      </button>

      <h2>Already have a Premium account?</h2>
      <button>
        <Link to="/login/owners">Sign in</Link>
      </button>
    
      
    </div>


  );


}
export default App;
