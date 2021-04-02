import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import Navbar from '../navbar/Navbar'
import { makeStyles } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { Button} from 'react-bootstrap';
import styled from 'styled-components';

import { GlobalStyle } from '../modal/globalStyles';
import { Link } from 'react-router-dom';
import Modal from '../modal/Modal';
import useModal from '../modal/useModal';

import Confirm from '../modal/Confirm';
import Sidebar from '../navbar/Sidebar'

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import EditDetails from './EditDetails';


const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}





function Profile() {
    
    const [show, setShow] = useState(false);
    const {isShowing, toggle} = useModal();

   
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    
    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data
    const [showModal, setShowModal] = useState(false); // appear modal

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

        

      const openModal = () => {
      setShowModal(prev => !prev); //show open modal 
  };

  //const [ showModal, setShowModal] = useState(false);
  // const openModal = () => { setShowModal (prev => prev)}

 
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

 

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }




    const changeAvatar = async(e) => {

        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
    } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

 

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }
    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }


   
    return (
        <>
        <div>
        
        <Sidebar />
        {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
        
           
        </div>
        <div className="profile_page">
            <div className="col-left">
                <h2>{isAdmin ? "Admin Profile": "User Profile"}</h2>

                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
                </div>
            
        
         
    <div className="Profile">
      <button className="button-default"  onClick={toggle}>Add Links</button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
    </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Your name" onChange={handleChange} />
                </div>

                
                <div className="form-group">
                    <label htmlFor="email">Bio</label>
        
                 <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" onChange={handleChange}  />
                </div>


              

                <button disabled={loading} onClick={handleUpdate}>Update</button>
            </div>

               

        
       
        </div>
      
        </>
    )          
            
}

export default Profile
