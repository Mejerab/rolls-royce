import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import HeadingText from "../hooks/HeaingText";
import { FaCheck, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

const MyOrder = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [ascendic, setAscendic] = useState('ascendic');
    const { data: price, refetch: refetch1 } = useQuery({
        queryKey: ['price'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/purchase/stat/${user?.email}`)
            return res.data
        }
    })

    const { data: orders, refetch } = useQuery({
        queryKey: ['orders'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}&type=${ascendic}`);
            return res.data;
        }
    })
    useEffect(() => {
        refetch();
        refetch1();
    }, [refetch, refetch1, ascendic, price])
    const handlePurchase = async (order) => {
        const orderInfo = {
            name: user?.displayName,
            email: user?.email,
            carName: order?.carName,
            carImage: order?.carImage,
            price: order?.price,
            quantity: order?.quantity,
            color: order?.color,
            customize: order?.customize || false,
            status: 'purchased'
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You really want to purchase this car!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#121212',
            background: '#111222',
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.post('/purchase', orderInfo);
                console.log(res.data.insertedId);
                const anotherRes = await axiosSecure.delete(`/orders/${order._id}`)
                console.log(anotherRes.data.deletedCount);

                if (anotherRes.data.deletedCount > 0 && res.data.insertedId) {
                    refetch1();
                    refetch();
                }
                return Swal.fire({
                    title: "Purchased!",
                    text: "Your car hase been purchased.",
                    icon: "success",
                    confirmButtonColor: '#121212',
                    background: '#111222'
                });
            }
        });
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#121212',
            background: '#111222',
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/orders/${id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                }
                return Swal.fire({
                    title: "Deleted!",
                    text: "Your order has been deleted.",
                    icon: "success",
                    confirmButtonColor: '#121212',
                    background: '#111222'
                });
            }
        });
    }
    return (
        <div>
            <HeadingText text={'Manage Your Orders'} />
            <p className="text-right">Total: ${price?.total}</p>
            <div className="flex justify-between">
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1 ">Filter <IoIosArrowDown className="text-lg" /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><button onClick={() => setAscendic('ascendic')}>Ascending Order</button></li>
                        <li><button onClick={() => setAscendic('descendic')}>Descending Order</button></li>
                    </ul>
                </div>
                {price?.total > 0 ? <div>
                    <Link to={{ pathname: '/confirm-payment', search: `${price?.total}` }}><button className="btn">Confirm Payment</button></Link>
                </div> :
                    <div className="tooltip" data-tip="Purchase a car">
                        <button className="btn disabled" disabled>Confirm Payment</button>
                    </div>}
            </div>
            <div className="my-5 grid gap-y-5">
                {
                    orders?.map(order =>
                        <div key={order._id} className="lg:grid grid-cols-3 items-center gap-x-5">
                            <div>
                                <img className="w-full lg:w-96 h-64 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl" src={order.carImage} alt="" />
                            </div>
                            <div className="w-full col-span-2">
                                <h3 className="text-2xl font-medium">{order?.carName}</h3>
                                <h5 className="my-2 font-medium text-lg"><span className=" text-[#FFFFF0]">Price:</span> {order?.price}</h5>
                                <h5 className="my-2 text-sm font-medium"><span className=" text-[#FFFFF0]">Quantity:</span> {order?.quantity}</h5>
                                <h5 className="my-2 text-sm font-medium"><span className=" text-[#FFFFF0]">Customization:</span> {order?.customize || 'No Customization'}</h5>
                                <h5 className="my-2 text-sm font-medium"><span className=" text-[#FFFFF0]">Color:</span> {order?.color}</h5>
                                <div className="my-2 flex justify-end items-end gap-x-5">
                                    <button onClick={() => handlePurchase(order)} className="btn"><FaCheck className="text-lg" /> Purchase</button>
                                    <Link to={`/order-details/${order._id}`} className="btn btn-outline"><FaEye className="text-lg" /> Edit</Link>
                                    <button onClick={() => handleDelete(order?._id)} className="btn bg-red-500"><FaTrash className="text-lg" />Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyOrder;