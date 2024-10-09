import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from "./CheckoutForm";
import HeadingText from "../../hooks/HeaingText";
import { useLocation } from "react-router-dom";

const ConfirmPayment = () => {
    const {search} = useLocation();
    const price = parseInt(search.slice(1));
    
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET);
    
    return (
        <div>
            <HeadingText text={'Finalize Transaction'} />
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} />
            </Elements>
        </div>
    );
};

export default ConfirmPayment;