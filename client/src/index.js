import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/core.scss'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from 'react-router-dom'

import Welcome from './pages/welcome/Welcome.js'
import NotFoundPage from './pages/404/NotFoundPage.js'
import Auth from './pages/auth/Auth.js'

import { isAuthorized, logout, update } from './utils/helper-functions'
import { UserSettings } from './pages/userSettings/UserSettings';
import { GameConfig } from './pages/gameConfig/GameConfig';

function App() {

    const [state, setState] = useState(null)

    const user = {
      username: undefined,
      userGames: [],
      email: undefined,
      auth: undefined
    }

    const sourceFunctions = {
      setUser: (thisUser) => {
        user.username = thisUser.username
        user.email = thisUser.email
        user.auth = true
        setState(user)
      },
      handleLogout: () => {
        logout()
        setState(null)
      },
      handleUpdateUser: (field) => {
        // console.log(field);
        update(field)
        // setState
      }
    }

    useEffect(() => {
      isAuthorized(setState)
    }, [])

    return (
        <Router>
          <Routes>
            <Route path='/' element={<Welcome state={state} sourceFunctions={sourceFunctions}/>}/>
            <Route path='/login' element={<Auth sourceFunctions={sourceFunctions}/>} />
            <Route path='/signup' element={<Auth sourceFunctions={sourceFunctions} />} />
            <Route path="/account" element={<UserSettings state={state} sourceFunctions={sourceFunctions} />} />
            <Route path="/game-config" element={<GameConfig />} />
            {/* <Route path='/game/:id' element={<Game />}/> */}
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </Router>
    )
}



ReactDOM.render(
   <React.StrictMode>
    <App/>
   </React.StrictMode>,
  document.getElementById('root')
);