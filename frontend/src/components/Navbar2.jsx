import { AiOutlineGlobal,AiOutlineSliders } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import { AuthContext } from "./helpers/AuthContext";
const Navbar2 = () =>{
   
    return(
    <div className="w-screenwidth h-32 flex mx-40 py-10">
        <div className="w-15%  font-saira text-5xl font-bold text-white">TensorITS</div>
        <div className="w-5%  flex justify-center py-2 font-saira text-slate-400 font-bold text-3xl"><FaCode /></div>
        <div className="w-5%  flex justify-center py-2 font-saira text-slate-400 font-bold text-3xl"><AiOutlineGlobal/></div>
        <div className="w-5%  flex justify-center py-2 font-saira text-slate-400 font-bold text-3xl"><FaCircleExclamation /></div>
        <div className="w-65% flex align-middle justify-end">
            <div className="w-60% bg-darkshade  rounded-md flex justify-around py-2 font-saira text-slate-400 font-bold text-2xl">
                <AiOutlineSliders className="my-1"/> Options
            </div>
        </div>
        <div className="w-5%  flex justify-center py-2 font-saira text-slate-400 font-bold text-3xl"><FaUser /></div>
    </div>
    );
    
    };
    
    export default Navbar2;