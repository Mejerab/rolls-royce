import { useQuery } from "@tanstack/react-query";
import HeadingText from "../hooks/HeaingText";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const OrderHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: payments } = useQuery({
        queryKey: ['payments'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    })
    console.log(payments);
    const total = payments?.reduce((sum, payment) => sum + parseInt(payment?.amount), 0)
    console.log(total);

    return (
        <div>
            <HeadingText text={'Your Purchase Journey'} />
            <div className="flex justify-between">
                <h3>Total Payments: {payments?.length}</h3>
                <h3>Total Amount: ${total}</h3>
            </div>
            <div className="overflow-x-auto my-7">
                <table className="table table-zebra text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((payment, idx) =>
                                <tr key={payment?._id}>
                                    <th>{idx + 1}</th>
                                    <td>{payment?.email}</td>
                                    <td>${parseInt(payment?.amount / 100)}</td>
                                    <td>{payment?.date}</td>
                                    <td>{payment?.tanx_id}</td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;