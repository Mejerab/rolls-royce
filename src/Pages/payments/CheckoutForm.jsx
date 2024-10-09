import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price }) => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { data: clientSecret } = useQuery({
        queryKey: ['secret'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.post('/create-payment-intent', { price })
            return res.data.clientSecret;
        }
    });
    const { data: purchase } = useQuery({
        queryKey: ['pays'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/purchase/${user?.email}`)
            return res.data
        }
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You wnat to pay the bill",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#121212',
            background: '#111222',
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (!stripe || !elements) {
                    return;
                }
                const card = elements.getElement(CardElement);
                if (card === null) {
                    return;
                }
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card
                })
                if (error) {
                    console.log('payment error', error);
                    setError(error)
                }
                if (paymentMethod) {
                    console.log('paymet method', paymentMethod);
                    setError('');
                }
                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: user?.email || 'anonymous',
                            name: user?.displayName || 'anonymous'
                        }
                    }
                })
                if (confirmError) {
                    console.log('confirm error', confirmError);
                    setError(confirmError)
                }
                if (paymentIntent) {
                    console.log('payment Intent', paymentIntent);
                    const paymentData = {
                        name: user?.displayName,
                        email: user?.email,
                        amount: paymentIntent.amount,
                        date: new Date().toLocaleString(),
                        tanx_id: paymentIntent.id,
                        cart_id: purchase?.map(money => money._id)
                    }
                    const res = await axiosSecure.post(`/payments/${user?.email}`, paymentData);
                    if (res.data.result.insertedId) {
                        Swal.fire({
                            title: "Payment Successfull!",
                            text: "Check your confirmation email",
                            icon: "success",
                            confirmButtonColor: '#121212',
                            background: '#111222'
                        });
                        setError('')
                        return navigate('/');
                    }
                }
            }
        });
    }
    const cardStyle = {
        style: {
            base: {
                color: '#fff',
                '::placeholder': {
                    color: '#767676'
                },
                iconColor: '#ffffff'
            },
        }
    }
    return (
        <div className="flex justify-center items-center h-full  min-h-[14.7rem]">
            <form className="lg:w-2/3 w-full mx-auto" onSubmit={handleSubmit}>
                <CardElement className="input" options={cardStyle} />
                <button className="btn w-full">Seal The Deal</button>
            </form>
            <p>{error}</p>
        </div>
    );
};
CheckoutForm.propTypes = {
    price: PropTypes.number
}

export default CheckoutForm;