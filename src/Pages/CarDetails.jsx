import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const CarDetails = () => {
    const { loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { data: carDetails, isLoading } = useQuery({
        queryKey: ['car'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic(`/cars/id/${id}`)
            return res.data
        }
    })
    console.log(carDetails);
    
    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><span className=" loading loading-spinner text-white"></span></div>
    }

    return (
        <div className="lg:flex my-5">
            <div className="lg:w-1/2 rounded-l-2xl">
                <img className="w-full h-full rounded-t-2xl lg:rounded-t-none rounded-l-none lg:rounded-l-2xl" src={carDetails?.image} alt="photo" />
            </div>
            <div className="lg:w-1/2 lg:pl-5 pt-5 lg:pt-0 rounded-r-2xl">
                <h4 className="text-2xl mb-2 font-semibold text-[#FFFFF0]">{carDetails?.name}</h4>
                <p className="text-gray-500 w-[90%]">{carDetails?.review}</p>
                <h5 className="my-2 font-medium text-sm lg:text-lg"><span className=" text-[#FFFFF0]">Engine:</span> {carDetails?.engine}</h5>
                <h5 className="my-2 font-medium text-sm lg:text-lg"><span className=" text-[#FFFFF0]">Mileage:</span> {carDetails?.mileage}</h5>
                <h5 className="my-2 font-medium text-sm lg:text-lg"><span className=" text-[#FFFFF0]">Price:</span> {carDetails?.price}</h5>
                <h5 className="my-2 font-medium text-sm lg:text-lg"><span className=" text-[#FFFFF0]">Available cars:</span> {carDetails?.available}</h5>
                <h5 className="my-2 font-medium text-sm lg:text-lg"><span className=" text-[#FFFFF0]">Colors:</span>
                    <div className="flex gap-x-5 ml-16">
                        {
                            carDetails?.colors?.map((color, idx) =>
                                <div className='w-10 h-10 checkbox' style={{ background: color.hex }} key={idx}></div>
                            )
                        }</div>
                </h5>
                <h5 className="my-2 font-medium text-sm lg:text-lg"><span className=" text-[#FFFFF0]">Features:</span>{
                    carDetails?.features?.map((feature, idx) =>
                        <li className="ml-16" key={idx}>{feature}</li>
                    )
                }</h5>
                <div className="flex justify-end items-end mb-2 mr-2">
                    <Link to={`/car-order/${carDetails?._id}`} className="btn">Order Now</Link>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;