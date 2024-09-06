import { Link } from "react-router-dom";
import Logo from "../logo/logo"


const Navbar = () => {

    return (
        <div 
            className="w-full sticky top-0 left-0 flex flex-row bg-white justify-between  shadow-lg pr-2 md:pr-40 md:pl-10 select-none"
            
        >
            <div className="flex flex-row items-center justify-center">
                <Logo/>
                <span className="quattrocento-sans-regular" >Docs</span>
            </div>
            <div className="flex flex-row items-center gap-10 justify-evenly ">
                <div 
                    className=" hover:text-lg ">
                    <Link className="hover:underline hover:text-blue-800"
                    to={"/login"}
                >Login</Link>
                </div >
                <div className=" hover:text-lg ">
                    <Link className="hover:underline hover:text-blue-800" to={"/register"}>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;