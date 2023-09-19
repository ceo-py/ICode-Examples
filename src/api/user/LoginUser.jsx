async function LoginUser(username, password) {
    const url = `http://127.0.0.1:3000/api/login`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    if (response.ok) {
        return {username, message: 'Login successful'}
    } else {
        return {username, message: 'Authentication failed'}
    }
}


export default LoginUser