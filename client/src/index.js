import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import SignupUser from './Components/SignupUser';
import SignupOwner from './Components/signupOwner';
import UserHomepage from './Components/UserHomepage';
import OwnerHomepage from './Components/OwnerHomepage';
import MatchPage from './Components/MatchPage';
import UserLogin from './Components/UserLogin';
import OwnerLogin from './Components/OwnerLogin';
import CreateProject from './Components/CreateProject';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>



      <Route path="/" element={<App />} />
      <Route path="/signup/user" element={<SignupUser />} />
      <Route path="/signup/owner" element={<SignupOwner />} />
      <Route path="/user-homepage" element={<UserHomepage />} />
      <Route path="/owner-homepage" element={<OwnerHomepage />} />
      <Route path="/match-page" element={<MatchPage />} />
      <Route path="/login/users" element={<UserLogin />} />
      <Route path="/login/owners" element={<OwnerLogin />} />
      <Route path="/projects/create" element={<CreateProject />} />





    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
