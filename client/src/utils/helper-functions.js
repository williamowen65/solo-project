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
        // console.log('res auth: ', res);
        if(res.cred){
            storeCred(res.cred)
        }
        /*
        There is an error with this. not dry... two place in code where you can set
        username, auth, userGames: []
        */
        app(res)
        return res
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
