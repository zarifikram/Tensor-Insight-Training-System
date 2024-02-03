// Popup.js
import { AuthContext } from "./helpers/AuthContext";
import react,{ useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { ColorContext } from "./helpers/ColorContext";

const ColorPickerPopup = ({ isOpen, onClose, children }) => {
    const [colorState,setColorState]= useContext(ColorContext);

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };

    //Color-picker---------------------------------------
    const bg_cp_box1=['bg-cp1-box1','bg-cp2-box1','bg-cp3-box1','bg-cp4-box1','bg-cp5-box1','bg-cp6-box1','bg-cp7-box1','bg-cp8-box1','bg-cp9-box1','bg-cp10-box1'];
    const bg_cp_bg=['bg-cp1-bg','bg-cp2-bg','bg-cp3-bg','bg-cp4-bg','bg-cp5-bg','bg-cp6-bg','bg-cp7-bg','bg-cp8-bg','bg-cp9-bg','bg-cp10-bg'];
    const border_cp_box2=['border-cp1-box2','border-cp2-box2','border-cp3-box2','border-cp4-box2','border-cp5-box2','border-cp6-box2','border-cp7-box2','border-cp8-box2','border-cp9-box2','border-cp10-box2'];     
    const text_cp_txt =['text-cp1-txt','text-cp2-txt','text-cp3-txt','text-cp4-txt','text-cp5-txt','text-cp6-txt','text-cp7-txt','text-cp8-txt','text-cp9-txt','text-cp10-txt'];       
    const bg_cp_cap =['bg-cp1-cap','bg-cp2-cap','bg-cp3-cap','bg-cp4-cap','bg-cp5-cap','bg-cp6-cap','bg-cp7-cap','bg-cp8-cap','bg-cp9-cap','bg-cp10-cap'];
    const text_cp_cap =['text-cp1-cap','text-cp2-cap','text-cp3-cap','text-cp4-cap','text-cp5-cap','text-cp6-cap','text-cp7-cap','text-cp8-cap','text-cp9-cap','text-cp10-cap'];
    const text_cp_box1 =['text-cp1-box1','text-cp2-box1','text-cp3-box1','text-cp4-box1','text-cp5-box1','text-cp6-box1','text-cp7-box1','text-cp8-box1','text-cp9-box1','text-cp10-box1'];
    const bg_cp_txt =['bg-cp1-txt','bg-cp2-txt','bg-cp3-txt','bg-cp4-txt','bg-cp5-txt','bg-cp6-txt','bg-cp7-txt','bg-cp8-txt','bg-cp9-txt','bg-cp10-txt'];
    const text_cp_box2=['text-cp1-box2','text-cp2-box2','text-cp3-box2','text-cp4-box2','text-cp5-box2','text-cp6-box2','text-cp7-box2','text-cp8-box2','text-cp9-box2','text-cp10-box2'];
    const bg_cp_box2=['bg-cp1-box2','bg-cp2-box2','bg-cp3-box2','bg-cp4-box2','bg-cp5-box2','bg-cp6-box2','bg-cp7-box2','bg-cp8-box2','bg-cp9-box2','bg-cp10-box2']
    const hover_text_cp_box2=['hover:text-cp1-box2','hover:text-cp2-box2','hover:text-cp3-box2','hover:text-cp4-box2','hover:text-cp5-box2',
                              'hover:text-cp6-box2','hover:text-cp7-box2','hover:text-cp8-box2','hover:text-cp9-box2','hover:text-cp10-box2']

    const themeName = ['solar light', 'nautilas', 'matrix', 'gruvbox dark','hedge','tron orange','godspeed','miami','bushido','mexican'];

    const setTheme = (themeNumber) =>{
      setColorState({
          cp:themeNumber,
          bgcolor:`bg-cp${themeNumber}-bg`,
          captioncolor:`text-cp${themeNumber}-cap`,
          textcolor:`text-cp${themeNumber}-txt`,
          textcolor2:`text-cp${themeNumber}-box2`,
          textcolor3:`text-cp${themeNumber}-bg`,
          box1color:`bg-cp${themeNumber}-box1`,
          box2color:`bg-cp${themeNumber}-box2`,
          box3color:`bg-cp${themeNumber}-txt`,
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
          <div className={` z-50 ${colorState.bgcolor} ${colorState.textcolor} p-4 max-w-screen-lg w-50% mx-auto rounded-md
           shadow-md transition-transform transform duration-300 font-saira my-16`}>
            <div className={`flex justify-center ${colorState.textcolor} pb-2 font-semibold text-2xl `}>
                <div>
                    <h2>Set Theme</h2>
                </div>
            </div>
            <div className="justify-center max-h-96 overflow-y-auto">
               
                {Array.from({ length: 10 }, (_, index) => (    
                <div className={`flex justify-between  hover:bg-gray-400 rounded-md`} onClick={() => handleThemes(index+1)}>
                  <div className={`w-40% pl-3 flex items-center font-semibold text-xl ${colorState.textcolor} hover:${colorState.textcolor2} `}>
                    <AiOutlineCheck className={`${colorState.cp === index + 1 ?``:`invisible`}`}/>
                    {themeName[index]}
                    
                    </div>
                  <div key={index} className={` flex w-10% h-8 m-2 bg-cp${index + 1}-bg rounded-full } 
                   text-cp${index + 1}-txt ${hover_text_cp_box2[index]}`}>
                    <div className={`w-100% flex justify-evenly items-center text-xxs`}>
                      <div className={`w-20% bg-cp${index + 1}-cap flex justify-center text-cp${index + 1}-cap rounded-full`}>-</div>
                      <div className={`w-20% ${bg_cp_box1[index]} flex justify-center text-cp${index + 1}-box1 rounded-full`}>-</div>
                      <div className={`w-20% bg-cp${index + 1}-txt flex justify-center text-cp${index + 1}-txt rounded-full`}>-</div>
                    </div>
                  </div>
                </div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPickerPopup;
