import { useForm } from "react-hook-form";
import HeadingText from "../hooks/HeaingText";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CarOrder = () => {
    const navigate = useNavigate();
    const form = location?.state?.form?.pathname || '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user, loading } = useAuth();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: orders } = useQuery({
        queryKey: ['orders'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`)
            return res.data;
        }
    })
    const disble = orders?.find(order => order.carId == id);

    const { data: carDetails, isLoading } = useQuery({
        queryKey: ['car'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic(`/cars/id/${id}`)
            return res.data
        }
    })
    if (isLoading) {
        return <div>Loading ...</div>
    }
    const { _id, name, image, price, colors, available } = carDetails;

    const onSubmit = async (data) => {
        if (data.quantity < 1 || data.quantity > parseInt(available)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Quantity should be valid',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444',
                background: '#111222'
            })
        }
        if (data.color === 'Choose your color') {
            return Swal.fire({
                title: 'Error!',
                text: 'Select a color',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444',
                background: '#111222'
            })
        }
        const orderInfo = {
            name: user?.displayName,
            email: user?.email,
            carId: _id,
            carName: name,
            carImage: image,
            price,
            quantity: data.quantity,
            color: data.color,
            customize: data.customize || false,
            status: 'pending'
        };
        const res = await axiosSecure.post('/orders', orderInfo)
        console.log(res.data);

        Swal.fire({
            title: 'success!',
            text: 'Order successfully added to cart.',
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#121212',
            background: '#111222'
        });
        return navigate(form)
        
    }
    return (
        <div>
            <HeadingText text={'Finalize Your Purchase'} />
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
                                <input disabled defaultValue={name} type="email" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type car name" />
                                {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type car name'}</p>}
                            </div>
                            <div className="w-full mx-auto">
                                <p className="font-medium">Price:</p>
                                <input disabled defaultValue={price} type="text" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type car price" />
                                {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type car price'}</p>}
                            </div>
                        </div>
                        <div className="flex gap-x-7 my-7">
                            <div className="w-full mx-auto">
                                <p className="font-medium">Quantity:</p>
                                <input defaultValue={parseInt('1')} {...register('quantity', { required: true })} type="number" className="input mt-2 border-none focus:outline-none w-full t" />
                            </div>
                            <div className="w-full mx-auto">
                                <p className="font-medium">Color:</p>
                                <select {...register('color', { required: true })} className="input w-full mt-2 border-none focus:outline-none t">
                                    <option disabled selected>Choose your color</option>
                                    {colors.map((color, idx) =>
                                        <option key={idx}>{color.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="w-full mx-auto">
                            <p className="font-medium">Customization: (optional)</p>
                            <textarea {...register('customize')} className="textarea w-full mt-2 border-none focus:outline-none t" rows={2} placeholder="Add customization"></textarea>
                        </div>
                    </div>
                    {
                        disble?._id ?
                            <div className="tooltip w-full" data-tip="You already orderd this car">
                                <button className="w-full btn my-7" disabled>Reserve Your Majesty</button>
                            </div> :
                            <div>
                                <button className="w-full btn my-7">Reserve Your Majesty</button>
                            </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default CarOrder;