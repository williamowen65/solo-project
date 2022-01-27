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

import { isAuthorized, logout, update, getGames } from './utils/helper-functions'
import { UserSettings } from './pages/userSettings/UserSettings';
import { GameConfig } from './pages/gameConfig/GameConfig';
import { Game } from './pages/game/Game';
import { CustomizeGame } from './pages/customizeGame/CustomizeGame';


function App() {

    const [state, setState] = useState(null)

    const stateTemplate = {
      games: {
        userGames: []
      },
      user: {
        username: undefined,
        userGames: [],
        email: undefined,
      },
      auth: undefined
    }

    const sourceFunctions = {
      setUser: (thisUser) => {
        stateTemplate.user.username = thisUser.username
        stateTemplate.user.email = thisUser.email
        stateTemplate.auth = true
        stateTemplate.user.userGames = thisUser.userGames
        console.log('state template: ', stateTemplate);
        setState(stateTemplate)
      },
      handleLogout: () => {
        logout()
        setState(null)
      },
      handleUpdateUser: (field, newUserGame) => {
        // console.log(field);
        // console.log(state);
        const updates = {}
        updates[field.name] = field.value
        update(field, state.user.email) /// Note just uses the email as a unique id for query, field contains the changes
        if(field.name === 'userGames'){
          updates[field.name] = state.user.userGames.concat(field.value)
        }
        console.log(newUserGame, state);
        if(newUserGame){
          setState({
            ...state,
            user: {
              ...state.user,
              ...updates
            },
            games: {
              ...state.games,
              userGames: state.games.userGames.concat(newUserGame)
            }
          })
        } else {
          setState({
            ...state,
            user: {
              ...state.user,
              ...updates
            }
          })
        }
        console.log(state);
      }
    }

    useEffect(() => {
      //check for auth on load
      isAuthorized(setState)
    }, [])

    useEffect(() => {
      //If authorized, then go ahead and query for games
      if(state && state.auth && state.user.userGames.length >= 0){
        console.log('fireeeed');
        //get game info
        getGames(setState, state)
      }
    }, [state && state.auth ? state.auth : null])

    return (
        <Router>
          <Routes>
            <Route path='/' element={<Welcome state={state} sourceFunctions={sourceFunctions}/>}/>
            <Route path='/login' element={<Auth sourceFunctions={sourceFunctions}/>} />
            <Route path='/signup' element={<Auth sourceFunctions={sourceFunctions} />} />
            {state && state.auth && <Route path="/account" element={<UserSettings state={state} sourceFunctions={sourceFunctions} />} />}
            <Route path="/game-config" element={<GameConfig state={state}/>}>
              {state && state.auth && (
                    <>
                      <Route path='/game-config/step-1' element={<GameConfig/>}/>
                      <Route path='/game-config/step-2' element={<GameConfig/>}/>
                    </>
              )}
            </Route>
            {state && state.auth && (
              <Route path="/user/games" element={<CustomizeGame state={state} sourceFunctions={sourceFunctions}/>}>
                <Route path="/user/games/new" element={<CustomizeGame state={state} sourceFunctions={sourceFunctions}/>}/>
              </Route>
            )}
            <Route path='/game/:id' element={<Game />}/>
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



