import { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

function CartDrawer() {
    const { items, subtotal, isOpen, closeCart, changeQty, removeItem } = useCart();

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeCart();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, closeCart]);

    if (!isOpen) return null;

    return (
        <div
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-white/40 backdrop-blur-md"
        >
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Shopping bag"
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col border-l border-neutral-200 bg-white text-black shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-5">
                    <h2 className="font-display text-[20px]">Shopping Bag</h2>
                    <button onClick={closeCart} aria-label="Close" className="cursor-pointer">
                        <X size={18} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="px-8 py-16 text-center text-[13px] text-neutral-500">
                            Your bag is empty.
                        </p>
                    ) : (
                        <ul>
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex gap-5 border-b border-neutral-200 px-8 py-6"
                                >
                                    <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center border border-neutral-200">
                                        <img src={item.image} alt={item.name} className="h-[60px] object-contain" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-tech text-[13px] font-semibold uppercase tracking-[0.1em]">
                                                {item.name}
                                            </h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                aria-label={`Remove ${item.name}`}
                                                className="cursor-pointer text-neutral-500 hover:text-black"
                                            >
                                                <X size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                        <p className="text-[12px] text-neutral-500">CHRONOS</p>
                                        <p className="mt-1 text-[14px] font-medium">
                                            ${item.price.toLocaleString()}
                                        </p>

                                        <div className="mt-3 inline-flex h-[22px] items-center border border-neutral-300 text-[11px]">
                                            <button
                                                onClick={() => changeQty(item.id, item.qty - 1)}
                                                aria-label="Decrease quantity"
                                                className="h-full w-6 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="w-6 text-center">{item.qty}</span>
                                            <button
                                                onClick={() => changeQty(item.id, item.qty + 1)}
                                                aria-label="Increase quantity"
                                                className="h-full w-6 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200 px-8 py-8">
                    <div className="flex items-center justify-between">
                        <span className="text-[16px]">Subtotal</span>
                        <span className="text-[18px] font-semibold">
                            ${subtotal.toLocaleString()}
                        </span>
                    </div>
                    <p className="mt-4 text-[12px] text-neutral-500">
                        Taxes and shipping calculated at checkout
                    </p>
                    {/* <button className="mt-5 h-[38px] w-full cursor-pointer bg-gold text-[11px] font-medium uppercase transition-opacity hover:opacity-90">
            Proceed to Checkout
          </button> */}
                    <Link
                        to="/checkout"
                        onClick={closeCart}
                        className="mt-5 flex h-[38px] w-full items-center justify-center bg-gold text-[11px] font-medium uppercase transition-opacity hover:opacity-90"
                    >
                        Proceed to Checkout
                    </Link>
                    <button
                        onClick={closeCart}
                        className="mt-5 w-full cursor-pointer text-center text-[13px]"
                    >
                        Continue Shopping
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default CartDrawer;