import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaAngry, FaHeart } from "react-icons/fa";
import { FaDownLong, FaKeyboard, FaUpLong } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const testCaseSchema = {
    "input": "",
    "output": "",
    "test_case_no": 1
}

// 100 testcases
const testCases = []
for (let i = 0; i < 100; i++) {
    testCases.push(testCaseSchema);
}

const newProblemSchema = {
    "title": "",
    "description": "",
    "depth": 0,
    "num_cases": 0,
    "used_manipulator": { "unique": true },
    "test_cases": testCases,
    "solution": ""
}

const AddProblem = () => {

    const options = ["newest", "unsolved"]
    const problem = {
        "title": "Is there a way in @pytorch of getting two sorted tensors of size Land generating in O(L) the sorted merged tensor?",
        "description": "Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?",
        "depth": 2,
        "used_manipulator": { "unique": true },
        "test_cases": [
            {
                "input": "[[-6, -2], [6, 2]]",
                "output": "[[-6, -2], [6, 2]]",
                "test_case_no": 1
            },
            {
                "input": "[[-10, -5], [-1, -8]]",
                "output": "[[-10, -5], [-1, -8]]",
                "test_case_no": 2
            },
            {
                "input": "[[-2, -5], [-10, 1]]",
                "output": "[[-5, -2], [1, -10]]",
                "test_case_no": 3
            },
            {
                "input": "[[9, 2], [9, 2]]",
                "output": "[[2, 9]]",
                "test_case_no": 4
            },
            {
                "input": "[[-6, 8], [-5, -4]]",
                "output": "[[-6, 8], [-5, -4]]",
                "test_case_no": 5
            }
        ],
        "solution": "o_tensor = torch.unique(tensor, dim=1)\ntensor = o_tensor\no_tensor = torch.unique(tensor, dim=0)\ntensor = o_tensor"
    }



    // make the same problem 10 times
    const problems = []
    for (let i = 0; i < 10; i++) {
        problems.push(problem);
    }

    const [context, setContext] = useState({ "option": "newest", newProblem: false, selectedProblem: -1, "problems": problems, "newProblemDetails": newProblemSchema }); // add more field as needed
    const [colorState, setColorState] = useContext(ColorContext);
    const [authState, setAuthState] = useContext(AuthContext);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'n' && context.selectedProblem === -1) {
                setContext({ ...context, "newProblem": true });
            }

            if (event.shiftKey && event.key === 'Enter') {
                setContext({ ...context, "newProblem": false });
                // do your post request here
              }
        };

        const handleKeyUp = () => {
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [context]);

    return (
        <div className="h-5/6 flex flex-col">
            <KeyBoardInstruction colorState={colorState} />
            <OptionBar colorState={colorState} context={context} setContext={setContext} options={options} />
            <ProblemList colorState={colorState} context={context} setContext={setContext} />
            <ProblemDetails colorState={colorState} context={context} setContext={setContext} />
            <AddNewProblem colorState={colorState} context={context} setContext={setContext} />
        </div>
    );

};

export default AddProblem;

const KeyBoardInstruction = ({ colorState }) => {
    return (
        <div className="flex justify-center h-8">
            <div className="text-4xl font-roboto font-bold">
                <div className={` flex items-center center h-full`}>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>n</div>
                    <p className={`${colorState.textcolor} text-sm`}>- Add New Contest</p>
                </div>
            </div>
        </div>
    );
}
const KeyBoardInstructionNewProblem = ({ colorState }) => {
    return (
        <div className="flex justify-center h-8">
            <div className="text-4xl font-roboto font-bold">
                <div className={` flex items-center center h-full`}>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>shift</div>
                    <p className={`${colorState.textcolor} text-sm`}>+</p>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>enter</div>
                    <p className={`${colorState.textcolor} text-sm`}>- post editorial</p>
                </div>
            </div>
        </div>
    );
}

const OptionBar = ({ colorState, context, setContext, options }) => {
    return (
        <div className="flex h-8 my-4">
            <div className="flex justify-evenly w-full">
                {options.map((option, index) => {
                    return <Option colorState={colorState} context={context} setContext={setContext} option={option} key={index} />
                }
                )}
            </div>
        </div>
    );
}

const Option = ({ colorState, context, setContext, option }) => {
    return (
        <div className="flex h-full w-1/6 justify-center cursor-pointer" onClick={() => setContext({ ...context, "option": option })}>
            <p className={`${option === context.option ? colorState.textcolor2 : colorState.textcolor} text-base font-roboto`}>{option}</p>
        </div>
    );
}
const ProblemList = ({ colorState, context, setContext }) => {
    const problems = context.problems;
    return (
        <div className=" h-full items-center overflow-y-auto">
            <div className="h-fit flex flex-col items-center ">

                {problems.map((problem, index) => {
                    return <Problem colorState={colorState} problem={problem} key={index} onClick={() => setContext({ ...context, "selectedProblem": index, "newProblem": false })} />
                }
                )}
            </div>
        </div>
    );
}

const Problem = ({ colorState, problem, onClick }) => {
    return (
        <div className="flex h-36 w-5/6 mb-8 cursor-pointer" onClick={onClick}>
            <div className="w-4/5">
                <div className="flex flex-col h-3/5 text-white font-roboto text-2xl">{problem.title}</div>
                {/* make sure the text does not overflow */}
                <div className={`flex flex-col h-2/5 ${colorState.textcolor} align-top`}>{problem.description.length > 200 ? problem.description.substring(0, 200) + "..." : problem.description}</div>
            </div>
            <div className="w-1/5">
                <div className="flex-col h-5/6 ">
                    {/* TO_DO make sure these come from backend */}
                    <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>{2} votes</div>
                    <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>{1} answers</div>
                    <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>{problem.depth} solutions</div>
                </div>
                <div className="flex h-1/6">
                    <div className={`flex w-full justify-end full ${colorState.textcolor} font-mono rounded-md`}>posted 49 mins ago   </div>
                </div>
            </div>
        </div>
    );
}

const ProblemDetails = ({ colorState, context, setContext }) => {
    return (
        context.selectedProblem === -1 ? <div /> : <ProblemPopUp colorState={colorState} context={context} setContext={setContext} />
    );
};

const ProblemPopUp = ({ colorState, context, setContext }) => {
    const onClick = (e) => {
        if (!e.target.closest('.popup')) {
            setContext({ ...context, "selectedProblem": -1 });

        }
    }
    const problem = context.problems[context.selectedProblem];
    return (
        // make sure the popup is centered and there is translucent background

        <div className="fixed top-0 left-0 w-screen bg-opacity-50 bg-black h-screen flex justify-center items-center" onClick={onClick}>
            <div className={`${colorState.bgcolor} w-5/6 h-5/6 bg-opacity-100 rounded-md popup p-12 overflow-y-auto`}>
                <div className="flex-col h-full">
                    <div className={`text-white font-roboto text-4xl font-bold w-5/6 h-fit`}> {problem.title}</div>
                    <div className={`${colorState.textcolor} font-roboto font-bold w-5/6 h-fit mb-8`}> {"problem_author"} : posted {31} mins ago</div>
                    <div className={`${colorState.textcolor} font-roboto font-bold h-fit text-lg mb-8`}> {problem.description}{problem.description}</div>
                    <TestCasePicker colorState={colorState} context={context} setContext={setContext} />
                    <VoteSolveReveal colorState={colorState} context={context} setContext={setContext} />
                    <div className="h-20" ></div>
                </div>
            </div>
        </div>
    );
}

const TestCasePicker = ({ colorState, context, setContext }) => {
    const testCases = context.problems[context.selectedProblem].test_cases;
    const [testCaseId, setTestCaseId] = useState(0);
    return (
        <div className="flex-col h-fit">
            <div className="flex w-full">
                <div className="w-1/6 flex justify-center items-center cursor-pointer" onClick={() => setTestCaseId(testCaseId > 0 ? testCaseId - 1 : testCaseId)}> <IoArrowBack className={`${colorState.box1color} p-2 text-white h-12 w-12 font-roboto rounded-full`} />   </div>
                <TestCase colorState={colorState} test_case={testCases[testCaseId]} />
                <div className="w-1/6 flex justify-center items-center cursor-pointer" onClick={() => setTestCaseId(testCaseId < testCases.length - 1 ? testCaseId + 1 : testCaseId)}> <IoArrowForward className={`${colorState.box1color} p-2 text-white h-12 w-12 font-roboto rounded-full`} />   </div>
            </div>
            <div className="w-full h-20">
                {/* it gives circular indicator of the number of test cases */}
                <div className="flex justify-center items-center h-full">
                    {testCases.map((_, index) => {
                        return <div className={`h-2 w-2 rounded-full mx-2 ${index === testCaseId ? "bg-white" : colorState.box1color}`}></div>
                    })}
                </div>
            </div>
        </div>
    );
}

const TestCase = ({ colorState, test_case }) => {
    return (
        <div className="flex-col h-72 w-full mb-8 ">
            <div className="text-white font-roboto text-2xl mb-4 font-roboto">input tensor</div>
            <div className={`flex flex-col h-fit bg-white bg-opacity-20 rounded-lg text-white font-roboto text-2xl p-10 mb-4`}><div className="bg-opacity-100">t = {test_case.input}</div></div>
            <div className="text-white font-roboto text-2xl mb-4 font-roboto mb-4">expected tensor</div>
            <div className={`flex flex-col h-fit bg-white bg-opacity-20 rounded-lg text-white font-roboto text-2xl p-10`}><div className="bg-opacity-100">t = {test_case.output}</div></div>
        </div>
    );
}

const VoteSolveReveal = ({ colorState, context, setContext }) => {
    const isVoted = false; // TODO: get this from backend
    const [revealSolution, setRevealSolution] = useState(false);

    const voteColor = isVoted ? "bg-white " + colorState.textcolor : "bg-white bg-opacity-10 textcolor-white";
    const revealColor = revealSolution ? "bg-white " + colorState.textcolor : "bg-white bg-opacity-10 textcolor-white";
    return (
        <div className="flex-col h-fit">
            <div className="flex h-20 items-center rounded-lg w-full">
                <div className={"flex w-fit px-8 h-10 rounded-lg items-center justify-center cursor-pointer mr-6 " + voteColor}> <FaHeart className="h-6 w-6 mr-4" /> Vote</div>
                <div className={`flex w-fit px-8 h-10 rounded-lg items-center justify-center cursor-pointer mr-6 ${colorState.box2color}`}> <FaKeyboard className="h-6 w-6 mr-4" /> Solve </div>
                <div className={"flex w-fit px-8 h-10 rounded-lg items-center justify-center cursor-pointer " + revealColor} onClick={() => setRevealSolution(!revealSolution)}> <FaAngry className="h-6 w-6 mr-4" /> reveal solution </div>
            </div>
            {revealSolution ?
                <SyntaxHighlighter language="python" showLineNumbers={true}>
                    {context.problems[context.selectedProblem].solution}
                </SyntaxHighlighter>
                : <div />}
        </div>
    );
}


const AddNewProblem = ({ colorState, context, setContext }) => {
    return (
        context.newProblem ? <NewProblem colorState={colorState} context={context} setContext={setContext} /> : <div />
    );
}

const NewProblem = ({ colorState, context, setContext }) => {
    const onClick = (e) => {
        if (!e.target.closest('.popup')) {
            setContext({ ...context, "newProblem": false });
        }
    }

    return (
        // make sure the popup is centered and there is translucent background

        <div className="fixed top-0 left-0 w-screen bg-opacity-50 bg-black h-screen flex justify-center items-center" onClick={onClick}>
            <div className={`${colorState.bgcolor} w-5/6 h-5/6 bg-opacity-100 rounded-md popup p-12 overflow-y-auto`}>
                <div className="flex-col h-full">
                    <div className={`text-white font-roboto text-4xl font-bold w-5/6 h-fit mb-12`}> add new editorial</div>
                    <CustomTextBox colorState={colorState} context={context} setContext={setContext} title="title" subtitle="pick a suitable title for the editorial" textboxStyle="text-2xl font-bold" target="title" />
                    <CustomTextBox colorState={colorState} context={context} setContext={setContext} title="description" subtitle="Limit the amount of character used to write the code. Use 0 for no limit" textboxStyle="" target="description" />
                    <CustomTextBox colorState={colorState} context={context} setContext={setContext} title="number of cases" subtitle="test cases help the discussion and the reader to possibly solve the problem" textboxStyle="h-fit w-11/12" target="num_cases" />
                    <TestCaseField colorState={colorState} context={context} setContext={setContext} />
                    <KeyBoardInstructionNewProblem colorState={colorState} />
                    <div className="h-20"></div>
                </div>
            </div>
        </div>
    );
}

const CustomTextBox = ({ colorState, context, setContext, title, subtitle, textboxStyle, target }) => {
    return (
        <div className="flex-col h-fit mb-8">
            <div className="font-roboto text-2xl text-white mb-2">{title}</div>
            <div className={`font-roboto text-sm ${colorState.textcolor} mb-2`}>{subtitle}</div>
            <textarea className={`w-full h-40 rounded-lg p-4 bg-white font-roboto bg-opacity-10 text-white  ${textboxStyle}`} value={context.newProblemDetails[target]} onChange={(e) => setContext({ ...context, "newProblemDetails": { ...context["newProblemDetails"], [target]: e.target.value } })} />
        </div>
    );
}

const TestCaseField = ({ colorState, context, setContext }) => {
    // populate the context testcase with empty testcases (as many as num_cases)
    const testCases = context.newProblemDetails.test_cases;
    const [testCaseId, setTestCaseId] = useState(0);

    const onChangeInput = (e) => {
        testCases[testCaseId].input = e.target.value;
        setContext({ ...context, "newProblemDetails": { ...context["newProblemDetails"], "test_cases": testCases } });
    }

    const onChangeOutput = (e) => {
        testCases[testCaseId].output = e.target.value;
        setContext({ ...context, "newProblemDetails": { ...context["newProblemDetails"], "test_cases": testCases } });
    }

    return (
        context.newProblemDetails.num_cases > 0 ?
            <div className="flex h-fit w-full items-center">
                <div className="w-11/12 h-full">
                <div className="flex-col h-fit mb-8">
                        <div className="font-roboto text-2xl text-white mb-2">expected tensor</div>
                        <div className={`font-roboto text-sm ${colorState.textcolor} mb-2`}>the tensor to end up</div>
                        <div className="flex w-full h-20 rounded-lg p-4 bg-white font-roboto bg-opacity-10">
                        <div className="text-white w-1/12 ">t = </div>
                        <textarea className={`w-full bg-transparent focus:outline-none ${colorState.textcolor3}`} value={testCases[testCaseId].input} onChange={onChangeInput} />
                        </div>
                    </div>

                    <div className="flex-col h-fit mb-8">
                        <div className="font-roboto text-2xl text-white mb-2">expected tensor</div>
                        <div className={`font-roboto text-sm ${colorState.textcolor} mb-2`}>the tensor to end up</div>
                        <div className="flex w-full h-20 rounded-lg p-4 bg-white font-roboto bg-opacity-10">
                        <div className="text-white w-1/12 ">t = </div>
                        <textarea className={`w-full bg-transparent focus:outline-none ${colorState.textcolor3}`} value={testCases[testCaseId].output} onChange={onChangeOutput} />
                        </div>
                    </div>
                </div>
                <div className="flex-col h-full w-1/12">
                    <div className="flex items-center h-20 w-full justify-center w-20 cursor-pointer" onClick={() => setTestCaseId(testCaseId < context.newProblemDetails.num_cases - 1 ? testCaseId + 1 : testCaseId)}><FaUpLong className={`${colorState.textcolor} text-2xl`} /></div>
                    <div className="text-white font-roboto text-2xl font-bold text-center">{testCaseId + 1} </div>
                    <div className="flex items-center h-20 w-full justify-center w-20 cursor-pointer" onClick={() => setTestCaseId(testCaseId > 0 ? testCaseId - 1 : testCaseId)}><FaDownLong className={`${colorState.textcolor} text-2xl`} /></div>
                </div>
            </div> : <div />
    );
}