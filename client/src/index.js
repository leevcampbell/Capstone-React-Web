import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import SignupUser from './SignupUser';
import SignupOwner from './signupOwner';
import UserHomepage from './UserHomepage';
import OwnerHomepage from './OwnerHomepage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>



      <Route path="/" element={<App />} />
      <Route path="/signup/user" element={<SignupUser />} />
      <Route path="/signup/owner" element={<SignupOwner />} />
      <Route path="/user-homepage" element={<UserHomepage />} />
      <Route path="/owner-homepage" element={<OwnerHomepage />} />




    </Routes>
  </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
