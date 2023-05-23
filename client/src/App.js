import React from 'react';
import { useState } from 'react';
import SignupUser from './SignupUser';
import SignupOwner from './signupOwner';
import UserHomepage from './UserHomepage';
import OwnerLogin from './OwnerLogin';
import UserLogin from './UserLogin';


import './App.css';
import OwnerHomepage from './OwnerHomepage';

function App() {

  const [currentForm, setCurrentForm] = useState('signupUser');
  const [currentLogin, setCurrentLogin] = useState('userLogin');

  const toggleLogin = (loginName) => {
    setCurrentLogin(loginName);
  }


  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }









  return (
    <div className="App">
      {
        currentForm === 'signupUser' ? <SignupUser onFormSwitch={toggleForm}/> : <SignupOwner onFormSwitch={toggleForm}/>
      }
      {
        currentLogin === 'userLogin' ? <UserLogin onLoginSwitch={toggleLogin}/> : <OwnerLogin onLoginSwitch={toggleLogin}/>
      }
      
     
      
    </div>


  );


}
export default App;
