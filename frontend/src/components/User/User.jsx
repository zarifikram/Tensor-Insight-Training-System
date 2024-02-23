import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ColorContext } from '../helpers/ColorContext'
import { Audio, RotatingLines } from 'react-loader-spinner'

export default function User() {
    const url = 'http://127.0.0.1:8000/api/user/5/' // TO-Do replace with proper url
    const [userInfo, setUserInfo] = useState(null)
    const [colorState, setColorState] = useContext(ColorContext);
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setUserInfo(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [userInfo])

    return (
        userInfo ? <div className='flex justify-center w-full'>
            <UperTab colorState={colorState} userInfo={userInfo} />

        </div> :
            <div className='flex justify-center h-96 w-full'>
                <RotatingLines color="red" />
            </div>
    )
}

const UperTab = ({ colorState, userInfo }) => {
    return (
        <div className={`w-4/5 h-52 px-12 py-2 rounded-lg ${colorState.box1color} flex`}>
            <div className='flex h-full w-2/5 py-4 flex-col justify-between pr-12'>
                <div>
                    <h3 className={`text-white text-xl`}>{userInfo.username}</h3>
                    <h5 className={`${colorState.textcolor} mt-4 text-sm`}>{userInfo.first_name} {userInfo.last_name}</h5>
                    <h5 className={`${colorState.textcolor} text-sm`}>{userInfo.email}</h5>
                </div>
                <div className='flex items-center h-12'>
                    <h1 className='text-white text-2xl mr-3'>{userInfo.level}</h1>
                    <ProgressBarCustom totalXp={100} xp={userInfo.xp} colorState={colorState}/>
                    <h1 className={`${colorState.textcolor} text-sm ml-3`}>{userInfo.xp}/100</h1>

                </div>
            </div>
            <div className={`${colorState.bgcolor} font-light h-full w-2`} />

            <div className='h-full w-fit py-4'>
                safas
            </div>
        </div>
    )
}

const ProgressBarCustom = ({ totalXp, xp, colorState }) => {
    return (
        <div className={`h-3 w-full ${colorState.bgcolor} rounded-full`}>
            <div className={`h-full w-${xp / totalXp * 100}% ${colorState.box2color} rounded-full`}></div>
        </div>
    )
}