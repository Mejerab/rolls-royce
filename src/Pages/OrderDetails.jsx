import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import HeadingText from "../hooks/HeaingText";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const OrderDetails = () => {
    const { user, loading } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const form = location?.state?.form?.pathname || '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: orderDetails, refetch, isLoading } = useQuery({
        queryKey: ['order data'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${id}`)
            return res.data;
        }
    })
    const { data: color } = useQuery({
        queryKey: ['color'],
        enabled: !loading && !isLoading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/cars/id/${orderDetails?.carId}`)
            return res.data?.colors;
        }
    })
    console.log(color);
    const onSubmit = async (data) => {
        const orderInfo = {
            name: user?.displayName,
            email: user?.email,
            carId: orderDetails?.carId,
            carName: orderDetails?.carName,
            carImage: orderDetails?.carImage,
            price: orderDetails?.price,
            quantity: data.quantity,
            color: data.color,
            customize: data.customize || false
        };
        const res = await axiosSecure.patch(`/orders/patch/${orderDetails._id}?email=${user?.email}`, orderInfo)
        console.log(res.data);
        
        if (res?.data?.modifiedCount) {
            refetch();
            Swal.fire({
                title: 'success!',
                text: 'Order updated successfully.',
                icon: 'success',
                confirmButtonText: 'Continue',
                confirmButtonColor: '#121212',
                background: '#111222'
            });
            return navigate(-1);
        }
    }

    return (
        <div>
            <HeadingText text={'Modify Your Purchase'} />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex gap-x-7 my-7">
                            <div className="w-full mx-auto">
                                <p className="font-medium">Name:</p>
                                <input disabled defaultValue={user?.displayName} type="text" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type your name" />
                                {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type your email'}</p>}
                            </div>
                            <div className="w-full mx-auto">
                                <p className="font-medium">Email:</p>
                                <input disabled defaultValue={user?.email} type="email" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type your email" />
                                {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type your email'}</p>}
                            </div>
                        </div>
                        <div className="flex gap-x-7 my-7">
                            <div className="w-full mx-auto">
                                <p className="font-medium">Car Name:</p>
                                <input disabled defaultValue={orderDetails?.carName} type="email" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type car name" />
                                {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type car name'}</p>}
                            </div>
                            <div className="w-full mx-auto">
                                <p className="font-medium">Price:</p>
                                <input disabled defaultValue={orderDetails?.price} type="text" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type car price" />
                                {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type car price'}</p>}
                            </div>
                        </div>
                        <div className="flex gap-x-7 my-7">
                            <div className="w-full mx-auto">
                                <p className="font-medium">Quantity:</p>
                                <input defaultValue={orderDetails?.quantity} {...register('quantity', { required: true })} type="number" className="input mt-2 border-none focus:outline-none w-full t" />
                            </div>
                            <div className="w-full mx-auto">
                                <p className="font-medium">Color:</p>
                                <select defaultValue={orderDetails?.color} {...register('color', { required: true })} className="input w-full mt-2 border-none focus:outline-none t">
                                    {color?.map((col, idx) =>
                                        <option key={idx}>{col.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="w-full mx-auto">
                            <p className="font-medium">Customization: (optional)</p>
                            <textarea defaultValue={typeof(orderDetails?.customize)=== "string" ? orderDetails?.customize : '' } {...register('customize')} className="textarea w-full mt-2 border-none focus:outline-none t" rows={2} placeholder="Add customization"></textarea>
                        </div>
                    </div>
                    <div>
                        <button className="w-full btn my-7">Confirm Your Majesty</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderDetails;