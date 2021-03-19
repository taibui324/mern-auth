import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isSerial, isUser} from '../../utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    serial_code:'',
    username:'' ,
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password, serial_code, username,err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})
        
        if(!isUser(username))
                return setUser({...user, err: "Invalid username.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        

        if(!isSerial(serial_code, serial_code))
            return setUser({...user, err: "Serial Code did not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password, serial_code
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page">
            <h2>Create Your Touch Share Account</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="Enter your full name" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter your username" id="username"
                    value={username} name="username" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Email </label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>


                <div>
                    <label htmlFor="serial_code">Touch Share Serial Code</label>
                    <input type="number" placeholder="Enter Serial Code" id="serial_code"
                    value={serial_code} name="serial_code" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
