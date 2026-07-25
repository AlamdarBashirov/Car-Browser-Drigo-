//register
//login
//logout
//get user information

import userData from '../data/users.json';
import delay from '../utils/delay';

let users = JSON.parse(localStorage.getItem("users"))
if(!users){
    users = [...userData]
    localStorage.setItem("users", JSON.stringify(users))
}

export const register = async (name, email, password) => {
    await delay(800)
    const user = users.find(user => user.email === email)
    if (user) {
        throw new Error("this user already exists")
    }
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password
    }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    return newUser
}

export const login = async (email, password) =>{
    await delay(800)
    const user = users.find(user => user.email === email)
    if (!user){
        throw new Error("this user does not exist, please register")
        // console.log(Error);
    }

    const currentPassword = user.password

    if(password !== currentPassword){
        throw new Error ("password is incorrect")
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    return user
}

export const logout = async () => {
    await delay (500)
    localStorage.removeItem("currentUser")
}

export const getCurrentUser = async () => {
    await delay(500)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser);
    
    return currentUser
}
login("alamdar@gmail.com", "salam")
getCurrentUser()

export default {register, login, logout, getCurrentUser}