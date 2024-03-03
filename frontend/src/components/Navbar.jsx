import { AiOutlineGlobal, AiOutlineSliders } from "react-icons/ai";
import { FaCode, FaWalkieTalkie } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaGamepad, FaNewspaper, FaUser } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";//<HiDotsHorizontal />
import { FaBolt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EnvVariableContext } from "./helpers/EnvVariableContext";

import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import ProblemSet from "./ProblemSet/ProblemSet";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

import SettingsPopUp from "./Settings";
import { Link } from "react-router-dom";
import HoverText from "./Beautification/HoverText";
import { MdMonitor, MdPunchClock } from "react-icons/md";

const quantityModes = [2, 4, 8, 16]
const timeModes = [600, 1800, 3600]
const customModes = []
const modesToOptions = {
    "quantity": quantityModes,
    "time": timeModes,
    "custom": customModes,
    "none": []
}

const defaultSettingOfMode = {
    "quantity": 2,
    "time": 600,
    "custom": 0
}

const Navbar = ({mode,setMode,isTimeSelecetionPopupOpen,setTimeSelecetionPopupOpen,sendTime,setSendTime,
    isSettingsSelectionPopUpOpen, setSettingsSelectionPopUpOpen,
    isQuantitySelecetionPopupOpen,setQuantitySelecetionPopupOpen,quantity,setQuantity}) => {

    const [routeContext, setRouteContext] = useState({ "isPractice": false, navItemIndex: 0 });
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const navigate = useNavigate();

   
    const [colorState, setColorState] = useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext)

    //Popup--------------------------------------------

    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        console.log("close")
        setPopupOpen(false);
    };

    const  openSettingsPopUp = () =>{
        if(mode.mode==="custom")setSettingsSelectionPopUpOpen(true);
        else if(mode.mode==="time")setTimeSelecetionPopupOpen(true);
        else if(mode.mode==="quantity")setQuantitySelecetionPopupOpen(true);
    }

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownClick = () => {
        setRouteContext({ isPractice: false, navItemIndex: 7 });
        setMode({ mode: 'none', setting: 1 });
        if (authState.loggedIn) navigate('./User');
        else navigate('./Authentication');
    };

    const handleDropdownAction = () => {
            axios.post(`${envVariables.backendDomain}api/signout/`
            ).then((response) => {
                    console.log("You Have Successfully Logged Out");
                    toast.success("Successfully Logged Out");
                    setAuthState(prevState => ({
                        ...prevState,
                        loggedIn: false // or false to change the state to logged out
                      }));
                      
                      navigate("/Authentication")
                }).catch((error) => {
                    console.log("error");
                    console.error("Error fetching data:", error);
                    toast.error("Couldn't log Out");
                }).finally(() => {
                    
                });
    };

    return (
        <div className="w-screenwidth h-28 flex mx-40 py-10">
            <div className={`w-10% flex items-center font-saira text-3xl font-black ${colorState.captioncolor}`}>TensorITS</div>
            <div className={`w-15% flex justify-start`}>

                <div className={` pl-5 flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => {navigate(`./`);setRouteContext({ "isPractice": false, "navItemIndex": -1 }); setMode({ mode: "none", setting: 1 });}} ><FaHome /></div>
                <div className={` pl-3  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() =>{ navigate(`./ProblemSet`); setMode({ mode: "none", setting: 1 });}} ><FaCode /></div>
                {/*
                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => navigate('/AddProblem')}><IoIosAddCircle /></div>
                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => navigate('/ContestList')}><FaBolt /></div>

                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} >
                    {<button onClick={openPopup} className={`hover:text-gray-400`}><IoMdSettings /></button>}
                </div>*/}
            </div>
            <div className="w-65% flex align-middle justify-end items-center px-2">
                <div className={`w-auto ${colorState.box1color}  rounded-md flex justify-evenly py-1 font-saira ${colorState.textcolor} font-thin text-lg transition-all duration-2500`}>
                    {routeContext.isPractice ? <Practice  mode={mode} setMode={setMode} setRouteContext={setRouteContext} /> : <Normal routeContext={routeContext} setRouteContext={setRouteContext}  setMode={setMode}/>}
                    <div className={`w-1.5 ${colorState.bgcolor} rounded mx-2`}></div>
                    <div className="w- flex justify-evenly items-center">
                        {/* use mode to option to display the list items one by one */}
                        {modesToOptions[mode.mode].map((option, index) => {
                            return (
                                <div key={index} className={`mx-2 flex items-center justify-center ${mode.setting === option ? colorState.textcolor2 : colorState.textcolor1} cursor-pointer`} onClick={() => {setMode({ ...mode, setting: option });  if(mode.mode==="time")setSendTime(option.toString()); if(mode.mode==="quantity")setQuantity(option);  } }>{option}</div>
                            );
                        })}
                        <div className="mx-2" onClick={openSettingsPopUp}><HiDotsHorizontal /></div>
                        
                    </div>
                </div>
            </div>
            <div className={`w-5%`}></div>

            <div
            className="relative"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
            >
            <div
                className={ `w-9 h-9 rounded-full flex justify-center items-center font-saira ${colorState.textcolor} font-bold text-2xl hover:bg-gray-400`}
                onClick={handleDropdownClick}
            >
                <FaUser/>
            </div>
            {dropdownVisible && authState.loggedIn &&(
                <div
                className="absolute left-1/2 transform -translate-x-1/2 top-full "
                >
                    <button
                        className={` ${colorState.box1color} ${colorState.textcolor2} block w-full text-left px-4 py-2  hover:bg-gray-400 mt-2  shadow-md rounded-md`}
                        onClick={handleDropdownAction}
                    >
                        Signout
                    </button>
                </div>
            )}
        </div>

            {
                <SettingsPopUp isOpen={isPopupOpen} onClose={closePopup} />
            }
            {
                <ToastContainer />
            }
        </div>
    );

};

const NavBarItem = ({ navMode, to, tooltip, icon,  mode, setMode, setRouteContext,route }) => {
    const navigate = useNavigate();
    const [colorState, setColorState] = useContext(ColorContext);
    return (
        <div className={`${mode.mode === navMode ? `flex items-center justify-center mx-2 ${colorState.textcolor2}` : `flex  items-center justify-center mx-2`}`}  onClick={() => { setMode({ mode: navMode, setting: defaultSettingOfMode[navMode] })
        navigate(route)
        }}>
            {icon}
            <HoverText tooltip={tooltip}>
                <div>{navMode}</div>
            </HoverText>
        </div>
    );
};

const NormalNavBarItem = ({ to, tooltip, navMode, icon,  routeContext, setRouteContext ,route,setMode}) => {
    const [colorState, setColorState] = useContext(ColorContext);
    const navigate = useNavigate();
    const onClick = () => {
       
        navigate(route)
        if (to === 1) {setRouteContext({ "isPractice": true, "navItemIndex": 1 });
        setMode({ mode: "custom", setting: 1 });
    }
        else{ setRouteContext({ "isPractice": false, "navItemIndex": to });
        setMode({ mode: "none", setting: 1 });
    }
    }
    return (
        <div className={`${routeContext.navItemIndex === to ? `flex items-center justify-center mx-2 ${colorState.textcolor2}` : `flex  items-center justify-center mx-2`}`} onClick={onClick}>
            <div className="mr-2">
            {icon}
            </div>
            <HoverText tooltip={tooltip}>
                <div>{navMode}</div>
            </HoverText>
        </div>
    );
}

export default Navbar;

const Practice = ({  mode, setMode,setRouteContext }) => {
    const [colorState, setColorState] = useContext(ColorContext);
    return (
        <div className="flex w-auto  justify-around mx-2.5">
            <NavBarItem navMode="custom" to={1} tooltip="Customize your own problem set" icon={<AiOutlineSliders />}  mode={mode} setMode={setMode} setRouteContext={setRouteContext} route="./CustomMode" />
            <NavBarItem navMode="time" to={2} tooltip="Solve problems within a time limit" icon={<IoTimeSharp />}  mode={mode} setMode={setMode} setRouteContext={setRouteContext} route="./TimeMode" />
            <NavBarItem navMode="quantity" to={3} tooltip="Solve as many problems as you can" icon={<FaBoltLightning />}  mode={mode} setMode={setMode} setRouteContext={setRouteContext} route="./QuantityMode" />
        </div>
    );
}

const Normal = ({ routeContext, setRouteContext,setMode}) => {
    const [colorState, setColorState] = useContext(ColorContext);
    return (
        <div className="flex w-auto  justify-around mx-2.5">
            <NormalNavBarItem to={1} navMode="Practice" tooltip="practice to your heart's content" icon={<MdMonitor />}  routeContext={routeContext} setRouteContext={setRouteContext} route="./CustomMode" setMode={setMode}/>
            <NormalNavBarItem to={2} navMode="OneVOne" tooltip="challenge a friend" icon={<FaGamepad />}  routeContext={routeContext} setRouteContext={setRouteContext} route="./OneVOne" setMode={setMode}/>
            <NormalNavBarItem to={3} navMode="Contest" tooltip="compete with others" icon={<MdPunchClock />}  routeContext={routeContext} setRouteContext={setRouteContext} route="./ContestList" setMode={setMode}/>
            <NormalNavBarItem to={5} navMode="Discussion" tooltip="discuss problems" icon={<FaWalkieTalkie />}  routeContext={routeContext} setRouteContext={setRouteContext} route="./DiscussionList" setMode={setMode}/>
        </div>
    );
}