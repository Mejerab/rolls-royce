import { Link, NavLink } from "react-router-dom";
import { SiRollsroyce } from "react-icons/si"
import { RiMenu2Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { IoMdLogIn } from "react-icons/io";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const closeDrawer = () => {
        document.getElementById('my-drawer').checked = false;
    }
    const lists = <>
        <li onClick={closeDrawer} className="mb-4 w-full block items-end"><NavLink to='/'>Home</NavLink></li>
        <li onClick={closeDrawer} className="mb-4 w-full block items-end"><NavLink to='/our-cars/1'>Our Cars</NavLink></li>
        <li onClick={closeDrawer} className="mb-4 w-full block items-end"><NavLink to='/about'>About us</NavLink></li>
        <li onClick={closeDrawer} className="mb-4 w-full block items-end"><NavLink to='/order-history'>Order History</NavLink></li>
        <li onClick={closeDrawer} className="mb-4 w-full block items-end"><NavLink to='/my-orders'>My Orders</NavLink></li>
    </>;
    const handleScroll = () => {
        if (window.scrollY > 400) { // Change 50 to the scroll threshold you want
            setIsScrolled(true);

        } else {
            setIsScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up the listener
        };
    }, []);
    return (
        <div className="navbar px-4 text-white border-gray-900 sticky top-0 bg-transparent backdrop-blur-md bg-opacity-50 z-50">
            <div className="navbar-start">
                <div className="drawer z-50 w-fit">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle transition-[all .7s ease]" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="hover:cursor-pointer  drawer-button"><RiMenu2Line className="text-xl" /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay w-full"></label>
                        <ul className="menu -ml-4 p-4 w-72 min-h-full text-white bg-[#121212CC]">
                            {/* Sidebar content here */}
                            <div className="">
                                {lists}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navbar-center mt-2">
                {!isScrolled ? <Link to='/' className="flex items-center justify-center castoro text-2xl opacity-1 delay-500 scale-90 transition-transform transform"><SiRollsroyce className="text-white text-4xl" /><span className="transition-transform ml-2 mt-2">Rolls Royce</span></Link> :
                    <Link to='/' className="flex items-center justify-center Castoro text-2xl"><SiRollsroyce className="text-white text-4xl opacity-1 delay-500 scale-90 transition-transform transform" /></Link>
                }
            </div>
            <div className="navbar-end">
                {user ? <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu rounded-lg menu-sm dropdown-content bg-black z-[1] mt-3 w-52 shado border p-5 border-gray-600">
                        <h4 className="text-center text-base py-2 font-semibold">{user.displayName}
                        </h4>
                        <li><button onClick={() => logOut()} className="btn border-white bg-black text-white">Logout</button></li>
                    </ul>
                </div> :
                    <>
                        <div className="hidden lg:block">
                            <Link to='/signup' className="btn rounded-full btn-ghost mr-2">Sign Up</Link>
                            <Link to='/login' className="btn rounded-full btn-ghost">Login</Link>
                        </div>
                        <div className="dropdown dropdown-end block lg:hidden">
                            <div tabIndex={0} role="button" className="btn flex items-center justify-center-ghost btn-circle avatar">
                                <div className="rounded-full">
                                <IoMdLogIn className="text-white text-3xl" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu rounded-lg menu-sm dropdown-content bg-black z-[1] mt-3 w-52 shado border p-5 border-gray-600">
                                    <Link to='/signup' className="btn rounded-full btn-ghost mr-2">Sign Up</Link>
                                    <div className="w-full bg-white h-[1px]"></div>
                                    <Link to='/login' className="btn rounded-full btn-ghost">Login</Link>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div >
    );
};

export default Header;