import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import 'aos/dist/aos.css'
import AOS from "aos";
const HeadingText = ({text}) => {
    const [animate, setAnimate] = useState(false);
    useEffect(()=>{
            AOS.init(setAnimate(true))
    }, [])
    return (
        <div className="w-fit mx-auto my-6">
            <h3 className="text-2xl lg:text-3xl font-medium castoro">{text}</h3>
            <div className="flex items-center justify-center">
                <div className="w-[50%] bg-white h-[1px]"></div>
                <div style={{transition: 'all .9s ease-in-out'}} className={`text-xl delay-1000 ${animate ? 'rotate-0' : 'rotate-45'}`}><RxCross2 /></div>
                <div className="w-[50%] bg-white h-[1px]"></div>
            </div>
        </div>
    );
};

HeadingText.propTypes = {
    text: PropTypes.string
}
export default HeadingText;