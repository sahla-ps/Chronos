import { useCart } from "../../context/CartContext";

function OrderSummary() {
  const { items, subtotal } = useCart();
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <aside className="h-fit bg-neutral-200 p-4 text-[10px]">
      <h2 className="font-display text-[12px]">Order Summary</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-neutral-500">Your bag is empty.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center border border-neutral-300 bg-white">
                <img src={item.image} alt="" className="h-[22px] object-contain" />
              </div>
              <div>
                <p className="font-tech text-[10px] font-semibold uppercase tracking-[0.08em]">{item.name}</p>
                <p className="text-neutral-500">Qty: {item.qty}</p>
                <p className="text-[11px] font-medium">${(item.price * item.qty).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 border-t border-neutral-400/50 pt-4 text-neutral-500">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toLocaleString()}</dd></div>
        <div className="flex justify-between"><dt>Shipping</dt><dd>Free</dd></div>
        <div className="flex justify-between"><dt>Tax (5%)</dt><dd>${tax.toLocaleString()}</dd></div>
      </dl>

      <div className="mt-4 flex justify-between border-t border-neutral-400/50 pt-4 text-[11px] font-medium text-black">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </aside>
  );
}

export default OrderSummary;