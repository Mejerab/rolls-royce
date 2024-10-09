import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HeadingText from "../hooks/HeaingText";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cars = () => {
    const { loading } = useAuth();
    const { page } = useParams();
    const axiosPublic = useAxiosPublic();
    const id = '66eda0be790314ee4c9439c7';
    const { data: exlcusive } = useQuery({
        queryKey: ['exclusive'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/cars/id/${id}`)
            return res.data;
        }
    })
    console.log(exlcusive);

    const [ascendic, setAscendic] = useState('ascendic');
    const pagination = [...Array(Math.ceil(30 / 9)).keys()];
    const { data: cars, refetch, isLoading } = useQuery({
        queryKey: ['allCars'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/cars/${page}?type=${ascendic}`);
            return res.data
        }
    })
    useEffect(() => {
        refetch();
        AOS.init();
    }, [page, refetch, ascendic])
    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><span className=" loading loading-spinner text-white"></span></div>
    }
    return (
        <div>
            <HeadingText text={'Crown Jewels of the Road'} />
            <div className="w-fit ml-auto my-6">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 ">Filter <IoIosArrowDown className="text-lg" /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><button onClick={() => setAscendic('ascendic')}>Ascending Order</button></li>
                        <li><button onClick={() => setAscendic('descendic')}>Descending Order</button></li>
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between gap-x-4 gap-y-8">
                {
                    cars?.map(car =>
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
            <div className="join flex justify-center my-12">
                {parseInt(page) > 1 ?
                    <Link to={`/our-cars/${parseInt(page) - 1}`}><button className="join-item btn btn-md"><RiArrowLeftSLine className="text-xl" /></button></Link> :
                    <button className="join-item btn btn-md"><RiArrowLeftSLine className="text-xl" /></button>}
                {
                    pagination.map((page, idx) =>
                        <Link to={`/our-cars/${page + 1}`} key={idx}><button onClick={() => refetch()} className="join-item btn btn-md">{page + 1}</button></Link>
                    )
                }
                {
                    parseInt(page) < pagination.length ?
                        <Link to={`/our-cars/${parseInt(page) + 1}`}><button className="join-item btn btn-md"><RiArrowRightSLine className="text-xl" /></button></Link> :
                        <button className="join-item btn btn-md"><RiArrowRightSLine className="text-xl" /></button>}
            </div>
        </div>
    );
};

export default Cars;