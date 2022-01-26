export function proxy(path) {
    return `http://localhost:3000${path}`
}

export function storeCred(cred) {
    console.log('store cred: ', cred);
    localStorage.setItem('accessToken', cred.accessToken)
    localStorage.setItem('refreshToken', cred.refreshToken)
}

export function isAuthorized() {
    const cred = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
    if(!cred.accessToken) return false;
    console.log(cred);
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
        console.log('res: ', res);
        if(res.cred){
            storeCred(res.cred)
        }
        return res
    }).catch(err => {
        console.log(err);
    })

    // return true
}
