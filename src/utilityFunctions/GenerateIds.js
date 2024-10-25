function generateUniqueID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    let id = ""

    for(let i=0; i<6; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return id
}

export default generateUniqueID