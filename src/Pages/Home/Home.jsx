import './Home.css'
// import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa';
import Car from './Car';
import { Link } from 'react-router-dom';
import Qna from './QNA';
import { useEffect } from 'react';
import AOS from 'aos';
const Home = () => {
    useEffect(()=>{
        AOS.init({
            once: true,
        })
    }, [])
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                speed={800}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                data-aos="fade-up"
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper lg:h-[480px] rounded-2xl"
            >
                <SwiperSlide className='z-40'><img className=' h-[230px] w-full lg:h-fit relative lg:bottom-5' src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/phantom-series-ii-in-detail/page-properties/01_RR_PHANTOM-single-twin-card-min.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[230px] w-full lg:h-fit relative lg:bottom-12' src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/4-0-bespoke/components/rolls-royce_GHOST_BESPOKE_D-min.jpg/jcr:content/renditions/cq5dam.web.1920.webp" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[230px] w-full lg:h-fit relative lg:bottom-36' src="https://www.cnet.com/a/img/resize/6618594de9d593d0cc3a8628a535264cf3b8500b/hub/2022/10/18/b85c4a74-8beb-44c4-92b8-b8ddd66f7a7e/rolls-royce-spectre-ev-coupe-111.jpg?auto=webp&width=1920" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[230px] w-full lg:h-fit relative lg:bottom-48' src="https://media.wired.com/photos/59325e5444db296121d6a94d/master/pass/5526761da90e7.jpg" alt="" /></SwiperSlide>
                <div className="text-center absolute -top-[12px] banner py-20 lg:py-56 my-3 rounded-xl castoro h-full w-full">
                    <h2 data-aos='fade-right' className='font-bold relative -mt-10 text-5xl hidden lg:block text-white z-30 '>Take the best that exists and <br /> make it better</h2>
                    <h5 data-aos='fade-right' className='font-bold relative text-2xl block lg:hidden text-white z-30 '>Take the best that exists and <br /> make it better</h5>
                    <Link data-aos='fade-left' to='/our-cars/1'><button className='btn bg-white text-black hover:bg-black hover:text-white border-none banner-btn lg:mt-5 z-30 relative rounded-full work-sans font-medium px-12'>Discover Now<FaArrowRight className='icon transition-[.9s] ml-1' /></button></Link>
                </div>
            </Swiper>
            <Car />
            <Qna />
        </>
    );
};

export default Home;