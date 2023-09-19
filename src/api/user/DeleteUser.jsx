async function DeleteUser(username) {
    const url = `http://127.0.0.1:3000/api/users/${username}`
    const options = {
        method: 'DELETE'
    }
    const output = await fetch(url,
        options)
    return await output.json()
}

export default DeleteUser