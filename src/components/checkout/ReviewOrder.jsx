
import { MapPin, LockKeyhole, ArrowLeft } from "lucide-react";

function ReviewOrder({ shippingInfo, onBack, onPlaceOrder }) {
  return (
    <div>
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-[12px] text-neutral-500 hover:text-black"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Shipping information */}
      <h2 className="mb-5 flex items-center gap-3 text-[12px]">
        <MapPin size={16} strokeWidth={1.5} />
        Shipping To:
      </h2>

      <div className="min-h-[93px] bg-neutral-200 p-4 text-[11px] text-neutral-600">
        <p className="font-medium text-black">
          {shippingInfo.firstName} {shippingInfo.lastName}
        </p>

        <p className="mt-2">
          {shippingInfo.city}, {shippingInfo.postal}
        </p>

        <p>{shippingInfo.country}</p>

        <p className="mt-1">{shippingInfo.phone}</p>
        <p>{shippingInfo.email}</p>
      </div>

      {/* Place order */}
      <button
        type="button"
        onClick={onPlaceOrder}
        className="mt-5 flex h-[30px] w-full cursor-pointer items-center justify-center gap-2 bg-gold text-[10px] font-medium uppercase text-black transition-opacity hover:opacity-90"
      >
        Place Order
        <LockKeyhole size={12} />
      </button>
    </div>
  );
}

export default ReviewOrder;
