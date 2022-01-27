
export function proxy(path) {
    return `http://localhost:3000${path}`
}

export function storeCred(cred) {
    // console.log('store cred: ', cred);
    localStorage.setItem('accessToken', cred.accessToken)
    localStorage.setItem('refreshToken', cred.refreshToken)
}

export function isAuthorized(app) {
    // console.log(app);
    let auth = false
    const cred = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
    if(!cred.accessToken) return false;
    // console.log(cred);
    // console.log(proxy('/user/auth'));
    fetch(proxy('/user/auth'),{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization-Access': `Bearer ${cred.accessToken}`,
            'Authorization-Refresh': `Bearer ${cred.refreshToken}`
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log('res auth: ', res, 'hi');
        if(res.cred){
            storeCred(res.cred)
            return true
        }
        if(res.auth){
            app(res)
            return true
        }
        /*
        There is an error with this. not dry... two place in code where you can set
        username, auth, userGames: []
        */
       console.log('nope');
        return false
    }).catch(err => {
        console.log(err);
    })
    return auth
}

export function logout() {
    const obj = {
        jwt: localStorage.getItem('refreshToken')
    }

    fetch(proxy('/user/logout'), {
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        // console.log(res);
        return res.json()
    })
    .then(res => {
        // console.log(res);
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }).catch(err => {
        console.log(err);
    })
}

export function update(field, email) {
        const obj = {
            email: email,
            field
        }
        console.log('obj: ', obj);
        fetch(proxy('/user'), {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

export function createGame(game, handleUpdateUser) {
 
        fetch(proxy('/games/create'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(game) 
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.error) throw new Error(res)
            //update database {$push: {userGames: 23123131243}}
            const updateObj = {
                name: 'userGames',
                value: res.game._id
            }
            console.log(updateObj);
            handleUpdateUser(updateObj)
        })
        .catch(err => console.log(err))
}

export function getGames(setState, state) {
    // console.log('getting games', array);
    const accessToken = localStorage.getItem('accessToken')
    fetch(proxy('/games/user'), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => res.json())
    .then(res => {
        setState({
            ...state,
            games: res.games
        })
    })
    .catch(err => console.log(err))

}