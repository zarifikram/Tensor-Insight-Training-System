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

import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import ProblemSet from "./ProblemSet/ProblemSet";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";

import SettingsPopUp from "./Settings";
import { Link } from "react-router-dom";
import HoverText from "./Beautification/HoverText";
import { MdMonitor, MdPunchClock } from "react-icons/md";

const quantityModes = [2, 4, 8, 16]
const timeModes = [60, 120, 180, 240]
const customModes = []
const modesToOptions = {
    "quantity": quantityModes,
    "time": timeModes,
    "custom": customModes,
    "none": []
}

const defaultSettingOfMode = {
    "quantity": 4,
    "time": 60,
    "custom": 0
}

const Navbar = ({ routeContext, setRouteContext }) => {

    const navigate = useNavigate();

    const [mode, setMode] = useState({ mode: "quantity", setting: 4 });
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

    return (
        <div className="w-screenwidth h-28 flex mx-40 py-10">
            <div className={`w-10% flex items-center font-saira text-3xl font-black ${colorState.captioncolor}`}>TensorITS</div>
            <div className={`w-15% flex justify-evenly`}>

                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => setRouteContext({isPractice:false, navItemIndex:4})}><FaHome /></div>
                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} ><FaCode /></div>
                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => navigate('/AddProblem')}><IoIosAddCircle /></div>
                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => navigate('/ContestList')}><FaBolt /></div>

                <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} >
                    {<button onClick={openPopup} className={`hover:text-gray-400`}><IoMdSettings /></button>}
                </div>
            </div>
            <div className="w-65% flex align-middle justify-end items-center px-2">
                <div className={`w-auto ${colorState.box1color}  rounded-md flex justify-evenly py-1 font-saira ${colorState.textcolor} font-thin text-lg transition-all duration-2500`}>
                    {routeContext.isPractice ? <Practice colorState={colorState} mode={mode} setMode={setMode} /> : <Normal routeContext={routeContext} setRouteContext={setRouteContext} colorState={colorState} />}
                    <div className={`w-1.5 ${colorState.bgcolor} rounded mx-2`}></div>
                    <div className="w- flex justify-evenly items-center">
                        {/* use mode to option to display the list items one by one */}
                        {modesToOptions[mode.mode].map((option, index) => {
                            return (
                                <div key={index} className={`mx-2 flex items-center justify-center ${mode.setting === option ? colorState.textcolor2 : colorState.textcolor1} cursor-pointer`} onClick={() => setMode({ ...mode, setting: option })}>{option}</div>
                            );
                        })}
                        <HiDotsHorizontal className="mx-2" />
                    </div>
                </div>
            </div>
            <div className={`w-5%`}></div>

            <Link className={`w-5%  flex justify-center items-center font-saira ${colorState.textcolor} font-bold text-2xl`} to="/Authentication" onClick={() => { setMode({ ...mode, mode: "none" }); }}><FaUser /></Link>
            {
                <SettingsPopUp isOpen={isPopupOpen} onClose={closePopup} />
            }
        </div>
    );

};

const NavBarItem = ({ navMode, to, tooltip, icon, colorState, mode, setMode }) => {
    return (
        <Link className={`${mode.mode === navMode ? `flex items-center justify-center mx-2 ${colorState.textcolor2}` : `flex  items-center justify-center mx-2`}`} to={to} onClick={() => { setMode({ mode: navMode, setting: defaultSettingOfMode[navMode] }) }}>
            {icon}
            <HoverText tooltip={tooltip}>
                <div>{navMode}</div>
            </HoverText>
        </Link>
    );
};

const NormalNavBarItem = ({ to, tooltip, navMode, icon, colorState, routeContext, setRouteContext }) => {
    const onClick = () => {
        if (to === 1) setRouteContext({ "isPractice": true, "navItemIndex": 1 });
        else setRouteContext({ "isPractice": false, "navItemIndex": to });
    }
    return (
        <Link className={`${routeContext.navItemIndex === to ? `flex items-center justify-center mx-2 ${colorState.textcolor2}` : `flex  items-center justify-center mx-2`}`} onClick={onClick}>
            <div className="mr-2">

            {icon}
            </div>
            <HoverText tooltip={tooltip}>
                <div>{navMode}</div>
            </HoverText>
        </Link>
    );
}

export default Navbar;

const Practice = ({ colorState, mode, setMode }) => {
    return (
        <div className="flex w-auto  justify-around mx-2.5">
            <NavBarItem navMode="custom" to="/CustomMode" tooltip="Customize your own problem set" icon={<AiOutlineSliders />} colorState={colorState} mode={mode} setMode={setMode} />
            <NavBarItem navMode="time" to="/TimeMode" tooltip="Solve problems within a time limit" icon={<IoTimeSharp />} colorState={colorState} mode={mode} setMode={setMode} />
            <NavBarItem navMode="quantity" to="/QuantityMode" tooltip="Solve as many problems as you can" icon={<FaBoltLightning />} colorState={colorState} mode={mode} setMode={setMode} />
        </div>
    );
}

const Normal = ({ routeContext, setRouteContext, colorState }) => {
    return (
        <div className="flex w-auto  justify-around mx-2.5">
            <NormalNavBarItem to={1} navMode="Practice" tooltip="practice to your heart's content" icon={<MdMonitor />} colorState={colorState} routeContext={routeContext} setRouteContext={setRouteContext} />
            <NormalNavBarItem to={2} navMode="OneVOne" tooltip="challenge a friend" icon={<FaGamepad />} colorState={colorState} routeContext={routeContext} setRouteContext={setRouteContext} />
            <NormalNavBarItem to={3} navMode="Contest" tooltip="compete with others" icon={<MdPunchClock />} colorState={colorState} routeContext={routeContext} setRouteContext={setRouteContext} />
            <NormalNavBarItem to={4} navMode="Editorial" tooltip="contribute to the problem set" icon={<FaNewspaper />} colorState={colorState} routeContext={routeContext} setRouteContext={setRouteContext} />
            <NormalNavBarItem to={5} navMode="Discussion" tooltip="discuss problems" icon={<FaWalkieTalkie />} colorState={colorState} routeContext={routeContext} setRouteContext={setRouteContext} />
        </div>
    );
}