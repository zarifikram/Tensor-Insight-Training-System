const Navbar = () =>{

    return(
    <div className="w-screenwidth h-32 flex mx-40 py-10">
        <div className="w-15%  font-saira text-5xl font-bold text-white">TensorITS</div>
        <div className="w-5%  flex justify-center py-1 font-saira text-slate-400 font-bold text-4xl">A</div>
        <div className="w-5%  flex justify-center py-1 font-saira text-slate-400 font-bold text-4xl">B</div>
        <div className="w-5%  flex justify-center py-1 font-saira text-slate-400 font-bold text-4xl">C</div>
        <div className="w-65% flex align-middle justify-end">
            <div className="w-60% bg-darkshade  rounded-md"></div>
        </div>
        <div className="w-5%  flex justify-center py-1 font-saira text-slate-400 font-bold text-4xl">Z</div>
    </div>
    );
    
    };
    
    export default Navbar;