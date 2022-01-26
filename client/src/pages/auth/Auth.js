import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { 
    proxy, 
    storeCred
} from '../../utils/helper-functions'

export default function Auth({sourceFunctions}) {
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname
    const [error, setError] = useState()
    const start = useRef()

    useEffect(() => {
        start.current.focus()
    }, [path])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(proxy('/user' + path));
        setError()

        const info = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        if(path === '/signup'){
            info.username = e.target.username.value
        }
        // console.log(info);
        fetch(proxy('/user' + path), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info),
            mode: 'cors',
            // credentials: 'include'
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.cred){
                storeCred(res.cred)
                sourceFunctions.setUser(res.user)
                navigate('/')
            } else {
                setError(res)
            }
        }).catch(err => {
            console.log(err);
        })
      
    }
    

    return (
        <form onSubmit={handleSubmit}>
            {path === '/signup'? 
                <h1>Signup</h1> : <h1>Login</h1>
            }
            {path === '/signup' && (
                <>
                <label htmlFor="username">Username
                    <input ref={start} type="text" name="username" id="username" placeholder='You can change this later' />
                    <p className='error'>{error && error.username ? error.username : null}</p>
                </label>
                <label htmlFor="email">Email
                    <input type="email" name="email" id="email" />
                    <p className='error'>{error && error.email ? error.email : null}</p>
                </label>
                </>
            )}
            {path === '/login' && (

                <label htmlFor="email">Email
                    <input ref={start} type="email" name="email" id="email" />
                    <p className='error'>{error && error.email ? error.email : null}</p>
                </label>
            )}
            <label htmlFor="password">Password
                <input type="password" name="password" id="password" />
                <p className='error'>{error && error.password ? error.password : null}</p>
            </label>
            <div className='btns'>
                <button className='btn'>Submit</button>
                {path === '/signup' ? 
                    <span className='btn' onClick={() => navigate('/login')}>Login</span>
                    :
                    <span className='btn' onClick={() => navigate('/signup')}>Sign up</span>
                }
            </div>
        </form>
    )
}
