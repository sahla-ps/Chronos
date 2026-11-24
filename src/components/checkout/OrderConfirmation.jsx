
function OrderConfirmation({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-[360px] bg-neutral-800 p-5 text-white shadow-xl">

        <h2 className="text-[15px] font-medium">
          Order Confirmed
        </h2>

        <p className="mt-3 text-[12px] leading-relaxed text-neutral-300">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>

        <button
          onClick={onClose}
          className="mt-4 text-[11px] text-white underline"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderConfirmation;
