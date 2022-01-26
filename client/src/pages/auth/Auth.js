import React from 'react'
import { useLocation } from 'react-router-dom'

import { proxy } from '../../utils/helper-functions'

export default function Auth(props) {
    const location = useLocation()
    const path = location.pathname

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(proxy('/user' + path));

        const info = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        if(path === '/signup'){
            info.username = e.target.username.value
        }

        fetch(proxy('/user' + path), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
      
    }

    return (
        <form onSubmit={handleSubmit}>
            {path === '/signup'? 
                <h1>Signup</h1> : <h1>Login</h1>
            }
            {path === '/signup' && <label htmlFor="username">Username
                <input path="text" name="username" id="username" placeholder='You can change this later' />
            </label>}
            <label htmlFor="email">Email
                <input path="email" name="email" id="email" />
            </label>
            <label htmlFor="password">Password
                <input path="password" name="password" id="password" />
            </label>
            <button>Submit</button>
        </form>
    )
}
