import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stepper from "../components/checkout/Stepper";
import ShippingForm from "../components/checkout/ShippingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentForm from "../components/checkout/PaymentForm";
import ReviewOrder from "../components/checkout/ReviewOrder"
import OrderConfirmation from "../components/checkout/OrderConfirmation";

function Checkout() {
    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    return (
        <>
            <Navbar solid />
            <main className="bg-white px-6 py-10 text-black md:px-[104px]">
                <nav aria-label="Breadcrumb" className="text-[13px] text-neutral-500">
                    <Link to="/">Home</Link> &gt; <span className="text-black">Checkout</span>
                </nav>

                <div className="md:px-[35px]">
                    <h1 className="mt-8 font-display text-[22px] font-normal">Secure Checkout</h1>
                    <Stepper step={step} />

                    <div className="mt-16 grid gap-10 pb-24 md:grid-cols-[minmax(0,1fr)_240px] md:gap-[50px]">
                        {step === 1 && (
                            <ShippingForm
                                initialValues={shippingInfo}
                                onContinue={(data) => {
                                    setShippingInfo(data);
                                    setStep(2);
                                }}
                            />
                        )}

                        {step === 2 && (
                            <PaymentForm
                                onBack={() => setStep(1)}
                                onReview={() => setStep(3)}
                            />
                        )}

                        {step === 3 && shippingInfo && (
                            <ReviewOrder
                                shippingInfo={shippingInfo}
                                onBack={() => setStep(2)}
                                onPlaceOrder={() => setOrderConfirmed(true)}
                            />
                        )}

                        <OrderSummary />
                        
                        {orderConfirmed && (
                            <OrderConfirmation
                                onClose={() => {
                                    setOrderConfirmed(false);
                                }}
                            />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Checkout;