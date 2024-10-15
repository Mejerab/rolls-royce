import { FaArrowRight } from "react-icons/fa";
import { MdSmsFailed } from "react-icons/md";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex justify-center items-center flex-col">
            <h2 className="text-5xl"><MdSmsFailed className="text-7xl block" /></h2>
            <p className="text-xl font-bold"><span className="italic">{error.status}</span> {error.statusText}</p>
            <button onClick={()=>navigate(-1)} className='btn bg-white text-black hover:bg-black hover:text-white border-none banner-btn lg:mt-5 z-30 relative rounded-full work-sans font-medium px-12'>Go Back<FaArrowRight className='icon transition-[.9s] ml-1' /></button>
        </div>
    );
};

export default ErrorPage;