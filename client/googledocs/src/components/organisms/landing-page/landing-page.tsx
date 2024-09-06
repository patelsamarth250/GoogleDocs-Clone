import Navbar from "../../atoms/navbar/navbar"
import LandingBody from "../../molecules/landing-body/landing-body";


const LandingPage = () => {



    return (
        <div className="w-full h-screen relative overflow-hidden ">
            <Navbar />
            <LandingBody/>
        </div>
    )
}

export default LandingPage;