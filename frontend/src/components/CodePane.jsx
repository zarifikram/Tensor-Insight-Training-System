import { AuthContext } from "./helpers/AuthContext";
import React, { useContext, useEffect, useRef } from "react";

const CodePane = () => {
    const [authState, setAuthState] = useContext(AuthContext);
    const [code, setCode] = React.useState("Start typing your code...");
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
            <div className={`pt-20 ${authState.textcolor2} font-roboto text-2xl font-bold`}>0/8</div>
            {/* <div className={` ${authState.textcolor} font-roboto text-2xl font-bold`}>lol typing your code . . .</div> */}
            <div className="py-4">
                <pre
                    ref={preRef}
                    style={{
                        selectionColor: 'green',
                    }}
                    className={`focus:outline-none p-4 h-60 p-0 overflow-auto font-roboto ${authState.textcolor} whitespace-pre-wrap text-2xl`}
                    contentEditable
                    spellCheck="false"
                    onInput={handleChange}
                    onKeyDown={onKeyDown}
                >
                    {code}
                </pre>

            </div>
        </div>
    );

};

export default CodePane;