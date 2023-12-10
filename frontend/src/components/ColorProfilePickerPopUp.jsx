// Popup.js
import { AuthContext } from "./helpers/AuthContext";
import react,{ useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Popup = ({ isOpen, onClose, children }) => {
    const [authState,setAuthState]= useContext(AuthContext);

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
    if (e.target.classList.contains('overlay')) {
      onClose();
    }
    };

    //Color-picker---------------------------------------
    const handleThemeSwitch1 = () => {
        // Update the state to change the className
        setAuthState({
          cp:1,
          bgcolor:'bg-cp1-bg',
          captioncolor:'text-cp1-cap',
          textcolor:'text-cp1-txt',
          textcolor2:'text-cp1-box2',
          box1color:'bg-cp1-box1',
          box2color:'bg-cp1-box2'
        })
        console.log(authState)
      };
    
    
      const handleThemeSwitch2 = () => {
        // Update the state to change the className
        setAuthState({
          cp:2,
          bgcolor:'bg-cp2-bg',
          captioncolor:'text-cp2-cap',
          textcolor:'text-cp2-txt',
          textcolor2:'text-cp2-box2',
          box1color:'bg-cp2-box1',
          box2color:'bg-cp2-box2'
        })
        console.log(authState)
    
      };
    
      const handleThemeSwitch3 = () => {
        // Update the state to change the className
        setAuthState({
          cp:3,
          bgcolor:'bg-cp3-bg',
          captioncolor:'text-cp3-cap',
          textcolor:'text-cp3-txt',
          textcolor2:'text-cp3-box2',
          box1color:'bg-cp3-box1',
          box2color:'bg-cp3-box2'
        })
        console.log(authState)
      }; 
    
      const handleThemeSwitch4 = () => {
        // Update the state to change the className
        setAuthState({
          cp:4,
          bgcolor:'bg-cp4-bg',
          captioncolor:'text-cp4-cap',
          textcolor:'text-cp4-txt',
          textcolor2:'text-cp4-box2',
          box1color:'bg-cp4-box1',
          box2color:'bg-cp4-box2'
        })
        console.log(authState)
      }; 
    
      const handleThemeSwitch5 = () => {
        // Update the state to change the className
        setAuthState({
          cp:5,
          bgcolor:'bg-cp5-bg',
          captioncolor:'text-cp5-cap',
          textcolor:'text-cp5-txt',
          textcolor2:'text-cp5-box2',
          box1color:'bg-cp5-box1',
          box2color:'bg-cp5-box2'
        })
        console.log(authState)
      }; 
      
      const handleThemeSwitch6 = () => {
        // Update the state to change the className
        setAuthState({
          cp:6,
          bgcolor:'bg-cp6-bg',
          captioncolor:'text-cp6-cap',
          textcolor:'text-cp6-txt',
          textcolor2:'text-cp6-box2',
          box1color:'bg-cp6-box1',
          box2color:'bg-cp6-box2'
        })
        console.log(authState)
      }; 
    
      const handleThemeSwitch7 = () => {
        // Update the state to change the className
        setAuthState({
          cp:7,
          bgcolor:'bg-cp7-bg',
          captioncolor:'text-cp7-cap',
          textcolor:'text-cp7-txt',
          textcolor2:'text-cp7-box2',
          box1color:'bg-cp7-box1',
          box2color:'bg-cp7-box2'
        })
        console.log(authState)
      }; 
    
      const handleThemeSwitch8 = () => {
        // Update the state to change the className
        setAuthState({
          cp:8,
          bgcolor:'bg-cp8-bg',
          captioncolor:'text-cp8-cap',
          textcolor:'text-cp8-txt',
          textcolor2:'text-cp8-box2',
          box1color:'bg-cp8-box1',
          box2color:'bg-cp8-box2'
        })
        console.log(authState)
      }; 
    
      const handleThemeSwitch9 = () => {
        // Update the state to change the className
        setAuthState({
          cp:9,
          bgcolor:'bg-cp9-bg',
          captioncolor:'text-cp9-cap',
          textcolor:'text-cp9-txt',
          textcolor2:'text-cp9-box2',
          box1color:'bg-cp9-box1',
          box2color:'bg-cp9-box2'
        })
        console.log(authState)
      }; 
    
      const handleThemeSwitch10 = () => {
        // Update the state to change the className
        setAuthState({
          cp:10,
          bgcolor:'bg-cp10-bg',
          captioncolor:'text-cp10-cap',
          textcolor:'text-cp10-txt',
          textcolor2:'text-cp10-box2',
          box1color:'bg-cp10-box1',
          box2color:'bg-cp10-box2'
        })
        console.log(authState)
      }; 

      //---------------------------------------------------
      const handleClick = () => {

        setAuthState({
            cp:10,
            bgcolor:'bg-cp10-bg',
            captioncolor:'text-cp10-cap',
            textcolor:'text-cp10-txt',
            textcolor2:'text-cp10-box2',
            box1color:'bg-cp10-box1',
            box2color:'bg-cp10-box2'
          })
        console.log("hello")
      };

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
               
                <div className={` flex w-30% h-16 m-2 bg-cp1-bg rounded-md ${(authState.cp === 1 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 1 ? 'border-8 border-cp1-box2':''} text-cp1-txt hover:text-cp1-box2` } onClick={handleThemeSwitch1}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>solar light</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp1-cap flex justify-center text-cp1-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp1-box1 flex justify-center text-cp1-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp1-txt flex justify-center text-cp1-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp2-bg rounded-md ${(authState.cp === 2 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 2 ? 'border-8 border-cp2-box2':''} text-cp2-txt hover:text-cp2-box2`} onClick={handleThemeSwitch2}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>nautilas</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp2-cap flex justify-center text-cp2-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp2-box1 flex justify-center text-cp2-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp2-txt flex justify-center text-cp2-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp3-bg rounded-md ${(authState.cp === 3 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 3 ? 'border-8 border-cp3-box2':''} text-cp3-txt hover:text-cp3-box2`} onClick={handleThemeSwitch3}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>matrix</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp3-cap flex justify-center text-cp3-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp3-box1 flex justify-center text-cp3-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp3-txt flex justify-center text-cp3-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp4-bg rounded-md ${(authState.cp === 4 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 4 ? 'border-8 border-cp4-box2':''} text-cp4-txt hover:text-cp4-box2`} onClick={handleThemeSwitch4}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>gruvbox dark</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp4-cap flex justify-center text-cp4-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp4-box1 flex justify-center text-cp4-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp4-txt flex justify-center text-cp4-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp5-bg rounded-md ${(authState.cp === 5)?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 5 ? 'border-8 border-cp5-box2':''} text-cp5-txt hover:text-cp5-box2`} onClick={handleThemeSwitch5}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>hedge</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp5-cap flex justify-center text-cp5-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp5-box1 flex justify-center text-cp5-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp5-txt flex justify-center text-cp5-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp6-bg rounded-md ${(authState.cp === 6 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 6 ? 'border-8 border-cp6-box2':''} text-cp6-txt hover:text-cp6-box2`} onClick={handleThemeSwitch6}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>tron orange</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp6-cap flex justify-center text-cp6-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp6-box1 flex justify-center text-cp6-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp6-txt flex justify-center text-cp6-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp7-bg rounded-md ${(authState.cp === 7 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 7 ? 'border-8 border-cp7-box2':''} text-cp7-txt hover:text-cp7-box2`} onClick={handleThemeSwitch7}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>godspeed</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp7-cap flex justify-center text-cp7-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp7-box1 flex justify-center text-cp7-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp7-txt flex justify-center text-cp7-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp8-bg rounded-md ${(authState.cp === 8 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 8 ? 'border-8 border-cp8-box2':''} text-cp8-txt hover:text-cp8-box2`} onClick={handleThemeSwitch8}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>miami</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp8-cap flex justify-center text-cp8-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp8-box1 flex justify-center text-cp8-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp8-txt flex justify-center text-cp8-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp9-bg rounded-md ${(authState.cp === 9 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 9 ? 'border-8 border-cp9-box2':''} text-cp9-txt hover:text-cp9-box2`} onClick={handleThemeSwitch9}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl `}>bushido</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp9-cap flex justify-center text-cp9-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp9-box1 flex justify-center text-cp9-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp9-txt flex justify-center text-cp9-txt rounded-full`}>c</div>
                  </div>
                </div>

                <div className={` flex w-30% h-16 m-2 bg-cp10-bg rounded-md ${(authState.cp === 10 )?'':'hover:scale-110 transition-transform duration-300'} ${authState.cp === 10 ? 'border-8 border-cp10-box2':''} text-cp10-txt hover:text-cp10-box2`} onClick={handleThemeSwitch10}>
                  <div className={`w-40%  flex justify-center items-center font-semibold text-xl  `}>mexican</div>
                  <div className={`w-60% flex justify-evenly items-center`}>
                    <div className={`w-15% bg-cp10-cap flex justify-center text-cp10-cap rounded-full`}>a</div>
                    <div className={`w-15% bg-cp10-box1 flex justify-center text-cp10-box1 rounded-full`}>b</div>
                    <div className={`w-15% bg-cp10-txt flex justify-center text-cp10-txt rounded-full`}>c</div>
                  </div>
                </div>
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

export default Popup;
