import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import React, { useContext, useEffect, useRef } from "react";
//const [colorState, setColorState] = useContext(ColorContext);

const CodePane = ({code,setCode,children}) => {
    const [colorState, setColorState] = useContext(ColorContext);
    
    const handleChange = (event) => {
        setCode(event.target.value);
    }

    const onKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            document.execCommand('insertText', false, '    ');
            // setCode(e.target.value+"\t");
        }
    };

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
                        // caretColor: 'orange',
                        caretShape: 'block',
                    }}
                    className={`focus:outline-none  h-60 p-0 overflow-auto font-roboto ${colorState.textcolor} whitespace-pre-wrap text-2xl`}
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