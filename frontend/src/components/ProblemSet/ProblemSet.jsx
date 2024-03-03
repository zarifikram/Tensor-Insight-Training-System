import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import React, { useContext } from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import Problem from "./Problem";
import Filter from "./Filter";
import axios from 'axios';
import { useEffect } from "react";

axios.defaults.withCredentials = true;

import { useRef } from "react";

function convertSettingsToString(settings) {
    let str = "";
    for (const key in settings.manipulator) {
        str += `&${key}=${settings.manipulator[key].toString()}`;
    }
    return str;
}

const ProblemSet = ({ routeContext, setRouteContext }) => {

    const navigate = useNavigate();
    const [colorState, setColorState] = useContext(ColorContext);
    const [authState, setAuthState] = useContext(AuthContext);

    //*Filtering-----------------------------------------
    const [is_user_added, setIs_user_added] = useState("");
    const iniSettings = {
        "depth": 2,
        "initiator": {
            "randint": false,
            "zeros": false,
            "ones": false,
            "arange": false
        },
        "manipulator": {
            "argwhere": false,
            "tensor_split": false,
            "gather": false,
            "masked_select": false,
            "movedim": false,
            "splicing": false,
            "t": false,
            "take": false,
            "tile": false,
            "unsqueeze": false,
            "negative": false,
            "positive": false,
            "where": false,
            "remainder": false,
            "clip": false,
            "argmax": false,
            "argmin": false,
            "sum": false,
            "unique": false
        }
    }

    const [settings, setSettings] = useState(iniSettings)

    const [difficultyGTE, setDifficultyGTE] = useState("")
    const [difficultyLTE, setDifficultyLTE] = useState("")
    const [depthGTE, setDepthGTE] = useState("")
    const [depthLTE, setDepthLTE] = useState("")


    const [isFilterPopUpOpen, setFilterPopUpOpen] = useState(false)
    const OpenFilter = () => {
        setFilterPopUpOpen(true);
        console.log(isFilterPopUpOpen);
    }

    const CloseFilter = () => {
        setFilterPopUpOpen(false);
    }

    const cleanFilter = () => {
        setSettings(iniSettings);
        setIs_user_added("")
        setDifficultyGTE("")
        setDifficultyLTE("")
        setDepthGTE("")
        setDepthLTE("")
    }

    //*Problems------------------------------------------
    const [perPage, setPerPage] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProblem, setCurrentProblem] = useState(1);
    const [problems, setProblems] = useState({
        "count": 27,
        "next": "http://127.0.0.1:8000/api/problem-set/?page=3&page_size=10",
        "previous": "http://127.0.0.1:8000/api/problem-set/?page_size=10",
        "results": [
            {
                "id": 17,
                "difficulty": "4.40",
                "used_manipulator": "[\"argmax\", \"gather\", \"t\"]",
                "solve_count": 3,
                "try_count": 45,
                "depth": 5,
                "is_user_added": false,
                "addedAt": "2024-01-27T07:40:12.379917Z",
                "status": null
            },
            {
                "id": 16,
                "difficulty": "3.70",
                "used_manipulator": "[\"where\", \"tile\", \"positive\", \"argwhere\", \"movedim\"]",
                "solve_count": 0,
                "try_count": 0,
                "depth": 5,
                "is_user_added": false,
                "addedAt": "2024-01-27T07:40:11.607640Z",
                "status": null
            },
            {
                "id": 15,
                "difficulty": "3.40",
                "used_manipulator": "[\"negative\", \"splicing\", \"argmax\", \"clip\"]",
                "solve_count": 0,
                "try_count": 0,
                "depth": 4,
                "is_user_added": false,
                "addedAt": "2024-01-27T07:40:10.858286Z",
                "status": null
            }
        ]
    });

    //*Probllem List-------------------------------------------------------------------------------------------
    useEffect(() => {
        let str = convertSettingsToString(settings)

        axios.get(`http://127.0.0.1:8000/api/problem-set/?page_size=${perPage}${str}&is_user_added=${is_user_added}&difficulty__gte=${difficultyGTE}&difficulty__lte=${difficultyLTE}&depth__gte=${depthGTE}&depth__lte=${depthLTE}`)
            .then((response) => {
                console.log(response.data);
                setProblems(response.data)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });

        setCurrentPage(1);
    }, [perPage, is_user_added, settings, depthGTE, depthLTE, difficultyGTE, difficultyLTE]);


    const goToPage = (page) => {
        let str = convertSettingsToString(settings)

        axios.get(`http://127.0.0.1:8000/api/problem-set/?page=${page}&page_size=${perPage}${str}&is_user_added=${is_user_added}&difficulty__gte=${difficultyGTE}&difficulty__lte=${difficultyLTE}&depth__gte=${depthGTE}&depth__lte=${depthLTE}`)
            .then((response) => {
                console.log(response.data);
                setProblems(response.data)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });

        setCurrentPage(page);
    }

    const goForward = () => {
        let str = convertSettingsToString(settings)

        if (problems.next != null) {
            axios.get(problems.next + `${str}&is_user_added=${is_user_added}&difficulty__gte=${difficultyGTE}&difficulty__lte=${difficultyLTE}&depth__gte=${depthGTE}&depth__lte=${depthLTE}`)
                .then((response) => {
                    console.log(response.data);
                    setProblems(response.data)
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                });

            if ((currentPage) < Math.ceil(problems.count / perPage))
                setCurrentPage(currentPage + 1);
        }
    }

    const goBackward = () => {
        let str = convertSettingsToString(settings)

        if (problems.previous != null) {
            axios.get(problems.previous + `${str}&is_user_added=${is_user_added}&difficulty__gte=${difficultyGTE}&difficulty__lte=${difficultyLTE}&depth__gte=${depthGTE}&depth__lte=${depthLTE}`)
                .then((response) => {
                    console.log(response.data);
                    setProblems(response.data)
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                });

            if ((currentPage - 1) > 0)
                setCurrentPage(currentPage - 1);
        }
    }

    //*Entering Specific Problem----------------------------------------------------------------------------------------------
    const enterProblem = (id) => {
        navigate(`/Problem/${id}`);
        setCurrentProblem(id);
    }

    const handleSelectChange = (e) => {
        const selectedOptionValue = e.target.value;
        setPerPage(selectedOptionValue);
    };




    return (
        <div className={`mx-40 ${colorState.textcolor} font-roboto`}>
            <div className={` `}>
                <div className={`text-2xl ${colorState.captioncolor} font-bold pb-5`}>Problem Set</div>
                <div className={`flex justify-end pb-5`}>
                    <div className={`${colorState.box1color} flex justify-center items-center px-3 py-3 mr-3 rounded-md hover:bg-gray-400`} onClick={() => navigate("/AddProblem")}>Add Problem</div>
                    <div className={`${colorState.box1color} flex justify-center items-center px-3 py-3 mr-3 rounded-md hover:bg-gray-400`} onClick={() => { cleanFilter() }}>Remove Filters</div>
                    <div className={`${colorState.box1color} flex justify-center items-center px-3 py-3 rounded-md hover:bg-gray-400`} onClick={() => { OpenFilter() }}>Filters</div>
                </div>
                {/*Column names----------------------------------------------------------*/}
                <div className={`flex w-100% justify-between pb-1`}>
                    <div className={`flex w-50% justify-start ${colorState.textcolor2}`}>
                        <div className={`w-10% flex justify-center`}>id</div>
                        <div className={`pl-20`}>tags</div>
                    </div>
                    <div className={`flex w-50% justify-between ${colorState.textcolor2}`}>
                        <div className={`w-25% flex justify-center`}>solved</div>
                        <div className={`w-25% flex justify-center`}>acceptance</div>
                        <div className={`w-25% flex justify-center`}>depth</div>
                        <div className={`w-25% flex justify-center`}>difficulty</div>
                    </div>
                </div>
                {/*Row Renders----------------------------------------------------------*/}
                {Array.from({ length: problems.results.length }, (_, index) => (
                    <div className={` `} onClick={() => enterProblem(problems.results[index].id)}>
                        <div className={`${(index + 1) % 2 === 1 ? `${colorState.box1color} w-100% flex justify-between rounded-md hover:bg-gray-400 hover:rounded-md py-2` : `w-100% flex justify-between hover:bg-gray-400 hover:rounded-md py-2`}`}>
                            <div className={`flex w-50% justify-start`}>
                                <div className={`w-10% flex justify-center`}>{problems.results[index].id}</div>
                                <div className={`pl-20`}>{problems.results[index].used_manipulator}</div>
                            </div>
                            <div className={`flex w-50% justify-between `}>
                                <div className={`w-25% flex justify-center `}>{problems.results[index].solve_count}</div>
                                <div className={`w-25% flex justify-center`}>{problems.results[index].try_count != 0 ? (100 * problems.results[index].solve_count / problems.results[index].try_count).toFixed(2) + "%" : "0.00%"}</div>
                                <div className={`w-25% flex justify-center`}>{problems.results[index].depth}</div>
                                <div className={`w-25% flex justify-center`}>{problems.results[index].difficulty}</div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={`flex w-100% justify-between pt-5`}>
                    <select className={`${colorState.box1color} py-2 rounded-md `}
                        onChange={handleSelectChange}
                        value={perPage}
                    >
                        <option value="10">10/page</option>
                        <option value="20">20/page</option>
                        <option value="30">30/page</option>
                        <option value="50">50/page</option>
                    </select>
                    <div className={`flex justify-end`}>
                        <div className={`${colorState.box1color} py-2 px-4 ml-2 rounded-md hover:bg-gray-400 flex items-center`} onClick={goBackward}><IoIosArrowBack /></div>
                        {Array.from({ length: Math.ceil(problems.count / perPage) }, (_, index) => (
                            <div className={`${(index + 1) == currentPage ? `${colorState.box2color} py-2 px-4 ml-2 rounded-md hover:bg-grey-400 ` : `${colorState.box1color} py-2 px-4 ml-2 rounded-md hover:bg-gray-400`}`}
                                onClick={() => goToPage(index + 1)}>{index + 1}</div>
                        ))}
                        <div className={`${colorState.box1color} py-2 px-4 ml-2 rounded-md hover:bg-gray-400 flex items-center `} onClick={goForward}><IoIosArrowForward /></div>
                    </div>
                </div>
            </div>
            {
                <Filter isOpen={isFilterPopUpOpen} onClose={CloseFilter}
                    is_user_added={is_user_added} setIs_user_added={setIs_user_added}
                    settings={settings} setSettings={setSettings}
                    difficultyGTE={difficultyGTE} setDifficultyGTE={setDifficultyGTE}
                    difficultyLTE={difficultyLTE} setDifficultyLTE={setDifficultyLTE}
                    depthGTE={depthGTE} setDepthGTE={setDepthGTE}
                    depthLTE={depthLTE} setDepthLTE={setDepthLTE}
                ></Filter>
            }
        </div>
    );

};

export default ProblemSet;