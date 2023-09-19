async function CreateUser({username, password}) {
    const url = `http://127.0.0.1:3000/api/users?username=${username}&password=${password}`
    const options = {
        method: 'POST'
    }
    const response = await fetch(url,
        options)
    return await response.json()
}

export default CreateUser