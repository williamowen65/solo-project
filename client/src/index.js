import React from 'react';
import ReactDOM from 'react-dom';
import './styles/core.scss'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Welcome from './pages/welcome/Welcome.js'
import NotFoundPage from './pages/404/NotFoundPage.js'

function App() {

    console.log('from app');
    return (
        <Router>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            {/* <Route path='/game/:id' element={<Game />}/> */}
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </Router>
    )
}



ReactDOM.render(
    <App/>,
  document.getElementById('root')
);