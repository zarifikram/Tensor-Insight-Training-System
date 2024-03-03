import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import { EnvVariableContext } from "./helpers/EnvVariableContext";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
//const [colorState, setColorState] = useContext(ColorContext);


const CodePane = ({onCodeChange}) => {
    const [colorState, setColorState] = useContext(ColorContext);
    const [code, setCode] = useState("Start typing your 1 code...");
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    
    const handleChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        const text= event.target.innerText;
        onCodeChange(text); // Call the callback function to update code in TimeMode
    }

    const onKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            document.execCommand('insertText', false, '    ');
        }
    };

    // useEffect(() => {
    //     console.log(code);
    // }, [code]);

    const preRef = useRef();

    useEffect(() => {
        // Set focus on the pre element when the component mounts
        preRef.current.focus();
    }, []);
    return (
        <div>
            
            {/* <div className={` ${colorState.textcolor} font-roboto text-2xl font-bold`}>lol typing your code . . .</div> */}
            <div className="py-4">
            <pre
                ref={preRef}
                style={{
                    selectionColor: 'green',
                    caretColor: `${colorState.textcolor3}`,
                    caretShape: 'block',
                }}
                className={`focus:outline-none h-60 p-0 overflow-auto font-roboto ${colorState.textcolor} whitespace-pre-wrap text-2xl`}
                contentEditable
                spellCheck="false"
                onInput={handleChange}
                onKeyDown={onKeyDown}
                id='code'
                
            >
                {code}
            </pre>

            </div>
        </div>
    );

};

export default CodePane;