import { useQuery } from "@tanstack/react-query";
import HeadingText from "../../hooks/HeaingText";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Car = () => {
    const { loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ['data'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get('/cars/1?type=ascendic')
            return res.data
        }
    })
    useEffect(()=>{
        AOS.init();
    }, [])
    return (
        <div className="my-12">
            <HeadingText text={'Drive In Luxury'} />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between gap-x-4 gap-y-8">
                {
                    data?.map(car =>
                        <div data-aos="fade-up" key={car._id} className="card card-compact bg-base-100 shadow-xl rounded-t-2xl">
                            <figure>
                                <img className="w-full rounded-t-2xl h-64"
                                    src={car.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="my-5">
                                <h2 className="card-title">{car.name}</h2>
                                <p className="text-gray-500">{car.review}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/car-details/${car._id}`} className="btn btn-primary btn-circle"><FaArrowRight className="text-lg" /></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="text-center">
                <Link to='/our-cars/1'><button className='btn bg-white text-black hover:bg-black hover:text-white border-none banner-btn mt-5 z-30 relative rounded-full work-sans font-medium px-12'>Step Into Luxury<FaArrowRight className='icon transition-[.9s] ml-1' /></button></Link>
            </div>
        </div>
    );
};

export default Car;