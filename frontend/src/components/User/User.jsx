import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ColorContext } from '../helpers/ColorContext'
import { Audio, RotatingLines } from 'react-loader-spinner'
import { AuthContext } from '../helpers/AuthContext'
import { EnvVariableContext } from "../helpers/EnvVariableContext";

export default function User() {

    const [colorState, setColorState] = useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const [userInfo, setUserInfo] = useState({
        "id": 6,
        "first_name": "saif",
        "last_name": "hafiz",
        "level": 1,
        "xp": 20,
        "maxi_xp": 204,
        "image": null,
        "username": "saif",
        "email": "saif@gmail.com",
        "num_of_problem_attempted": 1,
        "num_of_problem_solved": 2,
        "num_of_problem_added": 3,
        "num_of_contest_participated": 4,
        "num_of_1_v_1_participated": 5,
        "num_of_1_v_1_won":6,
        "num_of_prob_attempted_in_custom_mode": 7,
        "num_of_prob_solved_in_custom_mode": 8,
        "num_of_prob_attempted_in_quantity_mode": 9,
        "num_of_prob_solved_in_quantity_mode": 10,
        "num_of_prob_attempted_in_time_mode": 11,
        "num_of_prob_solved_in_time_mode": 12
      })
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${authState.id}/`)
            .then(response => {
                setUserInfo(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        userInfo ? <div className='flex flex-col items-center w-full'>
            <UperTab colorState={colorState} userInfo={userInfo} />
            <ProblemInfoTab colorState={colorState} userInfo={userInfo} />
            <ExtraInfoTab colorState={colorState} userInfo={userInfo} />
        </div> :
            <div className='flex justify-center h-96 w-full'>
                <RotatingLines color="red" />
            </div>
    )
}

const UperTab = ({ colorState, userInfo }) => {
    return (
        <div className={`w-4/5 h-52 px-12 py-2 rounded-xl ${colorState.box1color} flex`}>
            <div className='flex h-full w-2/5 py-4 flex-col justify-between pr-12'>
                <div>
                    <h3 className={`text-white text-xl`}>{userInfo.username}</h3>
                    <h5 className={`${colorState.textcolor} mt-4 text-sm`}>{userInfo.first_name} {userInfo.last_name}</h5>
                    <h5 className={`${colorState.textcolor} text-sm`}>{userInfo.email}</h5>
                </div>
                <div className='flex items-center h-12'>
                    <h1 className='text-white text-2xl mr-3'>{userInfo.level}</h1>
                    <ProgressBarCustom totalXp={userInfo.maxi_xp} xp={userInfo.xp} colorState={colorState} />
                    <h1 className={`${colorState.textcolor} text-sm ml-3`}>{userInfo.xp}/{userInfo.maxi_xp}</h1>
                </div>
            </div>
            <div className={`${colorState.bgcolor} font-light rounded-full h-full w-3`} />
            <div className='flex h-full w-3/5 py-4 justify-around items-center'>

                <div className='h-fit w-48 flex-col'>
                    <h2 className={`${colorState.textcolor} text-xs`}>problems attempted</h2>
                    <h1 className='text-white text-5xl'>{userInfo.num_of_problem_attempted}</h1>
                </div>
                <div className='h-fit w-48 flex-col'>
                    <h2 className={`${colorState.textcolor} text-xs`}>problems solved</h2>
                    <h1 className='text-white text-5xl'>{userInfo.num_of_problem_solved}</h1>
                </div>
                <div className='h-fit w-48 flex-col'>
                    <h2 className={`${colorState.textcolor} text-xs`}>problems added</h2>
                    <h1 className='text-white text-5xl'>{userInfo.num_of_problem_added}</h1>
                </div>
            </div>
        </div>
    )
}

const ProgressBarCustom = ({ totalXp, xp, colorState }) => {
    return (
        <div className={`h-3 w-full ${colorState.bgcolor} rounded-full`}>
            <div className={`h-full w-${Math.round(xp / totalXp * 20) * 5}% ${colorState.box2color} rounded-full`}></div>
        </div>
    )
}

const ProblemInfoTab = ({ colorState, userInfo }) => {
    return (
        <div className={`w-4/5 h-52 py-2 flex mt-12`}>
            <ProblemInfoSpecfic colorState={colorState} userInfo={userInfo} attempted={userInfo.num_of_prob_attempted_in_custom_mode} solved={userInfo.num_of_prob_solved_in_custom_mode} mode='custom mode' />
            <ProblemInfoSpecfic colorState={colorState} userInfo={userInfo} attempted={userInfo.num_of_prob_attempted_in_time_mode} solved={userInfo.num_of_prob_solved_in_time_mode} mode='time mode' />
            <ProblemInfoSpecfic colorState={colorState} userInfo={userInfo} attempted={userInfo.num_of_prob_attempted_in_quantity_mode} solved={userInfo.num_of_prob_solved_in_quantity_mode} mode='quantity mode' />
        </div>
    )
}

const ProblemInfoSpecfic = ({ colorState, userInfo, attempted, solved, mode }) => {
    return (
        <div className={`flex h-full w-1/3 py-4 px-6 justify-around items-center rounded-xl mr-3 ${colorState.box1color} `}>
            <div className='flex-col'>
                <h1 className='text-white text-2xl mb-4'>{mode}</h1>
                <div className='flex'>
                    <div className='h-fit w-48 flex-col'>
                        <h2 className={`${colorState.textcolor} text-xs`}>problems attempted</h2>
                        <h1 className='text-white text-5xl'>{attempted}</h1>
                    </div>
                    <div className='h-fit w-48 flex-col'>
                        <h2 className={`${colorState.textcolor} text-xs`}>problems solved</h2>
                        <h1 className='text-white text-5xl'>{solved}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExtraInfoTab = ({ colorState, userInfo }) => {
    // 3 per row
    return (
        <div className={`flex flex-wrap w-4/5 py-2 mt-12`}>
            <ExtraInfoSpecfic colorState={colorState} title='contests participated' value={userInfo.num_of_contest_participated} />
            <ExtraInfoSpecfic colorState={colorState} title='1v1 participated' value={userInfo.num_of_1_v_1_participated} />
            <ExtraInfoSpecfic colorState={colorState} title='1v1 won' value={userInfo.num_of_1_v_1_won} />
            {/* keep adding as needed */}
        </div>
    )
}

const ExtraInfoSpecfic = ({ colorState, title, value }) => {
    return (
        <div className={`flex flex-col h-full w-1/3 py-4 justify-around rounded-xl`}>
                <h1 className={`${colorState.textcolor} text-xl mb-4`}>{title}</h1>
                <h1 className='text-white text-6xl'>{value}</h1>
        </div>
    )
}