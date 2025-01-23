import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../State/Auth/Action';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
const Profile = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store)
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUser())
        }, 1000);
    }, [])
    return (
        <div>
            <div className='ml-28 mt-10'>
                <Avatar
                    className="text-white"
                    sx={{
                        bgcolor: deepPurple[500],
                        color: "white",
                        cursor: "pointer",
                    }}>{auth?.user?.firstName[0].toUpperCase()}</Avatar>
            </div>
            <div className='ml-40 -mt-8'>
                <h1>Hi,{auth?.user?.firstName}</h1>
                <h2>Your email: {auth?.user?.email}</h2>
            </div>
            <div>
                <h1 className='ml-28 mt-10'>Your Orders</h1>
                <div className='ml-28 mt-10'>
                    <iframe src="https://drive.google.com/file/d/1vpqsvl88zM3rCrq1aNGJWIhpzZgcf3rH/preview" width="640" height="480" allow="autoplay"></iframe>
                </div>
            </div>
        </div>
    )
}

export default Profile
