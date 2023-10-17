import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";

// TODO : provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2)); // *** if iwe convert the total in tofixed it will return a string so convert in number  so use parseFloat
    console.log(price);
    return (
        <div className="w-full">
            <SectionTitle subHeading={"Please Process payment "} heading={"Payment"}></SectionTitle>
            <h2 className="text-3xl">Taka payment page </h2>
            <Elements stripe={stripePromise}>
                
                <CheckoutForm cart={cart} price={price} ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;