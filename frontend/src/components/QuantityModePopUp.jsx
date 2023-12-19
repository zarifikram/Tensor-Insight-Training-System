// Popup.js
import { AuthContext } from "./helpers/AuthContext";
import react,{ useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const QuantityModePopUp = ({ isOpen, onClose, children }) => {
    const [authState,setAuthState]= useContext(AuthContext);

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };

    //Color-picker---------------------------------------
    const themeName = ['solar light', 'nautilas', 'matrix', 'gruvbox dark','hedge','tron orange','godspeed','miami','bushido','mexican'];
    const hover_text_cp_box2=['hover:text-cp1-box2','hover:text-cp2-box2','hover:text-cp3-box2','hover:text-cp4-box2','hover:text-cp5-box2',
    'hover:text-cp6-box2','hover:text-cp7-box2','hover:text-cp8-box2','hover:text-cp9-box2','hover:text-cp10-box2']


    const setTheme = (themeNumber) =>{
        setAuthState({
            cp:themeNumber,
            bgcolor:`bg-cp${themeNumber}-bg`,
            captioncolor:`text-cp${themeNumber}-cap`,
            textcolor:`text-cp${themeNumber}-txt`,
            textcolor2:`text-cp${themeNumber}-box2`,
            box1color:`bg-cp${themeNumber}-box1`,
            box2color:`bg-cp${themeNumber}-box2`
          })
    }

    const handleThemes = (param) => {
        setTheme(param);
      };
    //---------------------------------------------------

    return (
    <>
      <div
        className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose} // Added onClick event for the entire popup
        >
        <div className="flex items-center justify-center min-h-screen">
          <div className="overlay fixed inset-0 bg-black opacity-50"></div>
          <div className={` z-50 ${authState.bgcolor} ${authState.textcolor} p-4 max-w-screen-lg w-4/5 mx-auto rounded-md shadow-md transition-transform transform duration-300 font-saira`}>
            <div className={`flex justify-center ${authState.textcolor} pb-2 font-semibold text-2xl `}>
                <div>
                    <h2>Settings</h2>
                </div>
            </div>
            <div className="flex flex-wrap justify-center ">
               
                {Array.from({ length: 10 }, (_, index) => (               
                    <div key={index} className={` flex w-30% h-16 m-2 bg-cp${index + 1}-bg rounded-md ${(authState.cp === index + 1 )?'':'hover:scale-110 transition-transform duration-300'}
                     ${authState.cp === index + 1 ? `border-8 border-cp${index + 1}-box2`:``} text-cp${index + 1}-txt ${hover_text_cp_box2[index]}`} onClick={() => handleThemes(index+1)}>
                    <div className={`w-40%  flex justify-center items-center font-semibold text-xl  `}>{themeName[index]}</div>
                    <div className={`w-60% flex justify-evenly items-center`}>
                      <div className={`w-15% bg-cp${index + 1}-cap flex justify-center text-cp${index + 1}-cap rounded-full`}>a</div>
                      <div className={`w-15% bg-cp${index + 1}-box1 flex justify-center text-cp${index + 1}-box1 rounded-full`}>b</div>
                      <div className={`w-15% bg-cp${index + 1}-txt flex justify-center text-cp${index + 1}-txt rounded-full`}>c</div>
                    </div>
                  </div>

                ))}

            </div>
         
            <button className={`${authState.textcolor2} absolute top-2 right-2  hover:text-gray-400`} onClick={onClose}>
              <AiOutlineCloseCircle /> 
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantityModePopUp;
