

const Card = ({innerText , outerText}) =>{
    return (
        <div
            className="relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer  text-center text-xl bg-opacity-80  font-bold bg-blue-400"
            >
            <div className="z-10 absolute w-full h-full peer"></div>
            <div
                className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-blue-300 transition-all duration-500  bg-opacity-80 "
            ></div>
            <div
                className="absolute flex text-sm hover:text-2xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-blue-300 transition-all duration-500 p-3 text-white  bg-opacity-80 "
            >
                {innerText}
            </div>
            <div className="w-full h-full items-center justify-center flex text-white uppercase  bg-opacity-80 ">
                {outerText}
            </div>
            </div>

    )
}

export default Card;