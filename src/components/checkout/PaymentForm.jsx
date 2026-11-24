
import { useState } from "react";
import { ChevronLeft, CreditCard } from "lucide-react";


const empty = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const field =
  "h-[34px] w-full bg-neutral-200 px-3 text-[11px] outline-none placeholder:text-neutral-500 transition-colors";

function PaymentForm({ onBack, onReview }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.cardName.trim() || form.cardName.trim().length < 2) {
      newErrors.cardName = "Please enter a valid name";
    }

    // Card number validation
    const cardNumber = form.cardNumber.replace(/[\s-]/g, "");

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must contain 16 digits";
    }

    // Expiry validation
    const expiry = form.expiry.trim();
    const expiryMatch = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

    if (!expiryMatch) {
      newErrors.expiry = "Enter expiry in MM/YY format";
    } else {
      const month = Number(expiryMatch[1]);
      const year = 2000 + Number(expiryMatch[2]);
      const now = new Date();

      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiry = "Card has expired";
      }
    }

    // CVV validation
    if (!/^\d{3,4}$/.test(form.cvv.trim())) {
      newErrors.cvv = "CVV must contain 3 or 4 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onReview();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-6 text-xl font-semibold">
        Payment Details
      </h2>

      {/* Name on Card */}
      <div className="mb-5">
        <label className="mb-2 block text-xs">
          Name on Card
        </label>

        <input
          type="text"
          name="cardName"
          value={form.cardName}
          onChange={handleChange}
          className={`${field} ${
            errors.cardName ? "border border-red-500" : ""
          }`}
          placeholder="Enter name on card"
          aria-invalid={Boolean(errors.cardName)}
        />

        {errors.cardName && (
          <p className="mt-1 text-[11px] text-red-600">
            {errors.cardName}
          </p>
        )}
      </div>

      {/* Card Number */}
      <div className="mb-5">
        <label className="mb-2 block text-xs">
          Card Number
        </label>

        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          className={`${field} ${
            errors.cardNumber ? "border border-red-500" : ""
          }`}
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          aria-invalid={Boolean(errors.cardNumber)}
        />

        {errors.cardNumber && (
          <p className="mt-1 text-[11px] text-red-600">
            {errors.cardNumber}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry */}
        <div>
          <label className="mb-2 block text-xs">
            Expiry Date
          </label>

          <input
            type="text"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className={`${field} ${
              errors.expiry ? "border border-red-500" : ""
            }`}
            placeholder="MM/YY"
            aria-invalid={Boolean(errors.expiry)}
          />

          {errors.expiry && (
            <p className="mt-1 text-[11px] text-red-600">
              {errors.expiry}
            </p>
          )}
        </div>

        {/* CVV */}
        <div>
          <label className="mb-2 block text-xs">
            CVV
          </label>

          <input
            type="password"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            className={`${field} ${
              errors.cvv ? "border border-red-500" : ""
            }`}
            placeholder="123"
            inputMode="numeric"
            aria-invalid={Boolean(errors.cvv)}
          />

          {errors.cvv && (
            <p className="mt-1 text-[11px] text-red-600">
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <button
          type="submit"
          className="bg-black px-6 py-3 text-xs text-white"
        >
          Review Order
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
