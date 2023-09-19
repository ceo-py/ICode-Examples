async function ListAllUsers() {
    const url = `http://127.0.0.1:3000/api/users`
    const options = {
        method: 'GET'
    }
    const output = await fetch(url,
        options)
    return await output.json()
}

export default ListAllUsers