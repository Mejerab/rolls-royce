import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const Roots = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup');
    return (
        <div data-theme='black' className="work-sans  max-w-[1300px] mx-auto">
                {noHeaderFooter || <Navbar></Navbar>}
            <div className={`min-h-[19.5rem] ${noHeaderFooter ? '' : "mx-4"}`}>
                <Outlet></Outlet>
            </div>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Roots;