import { useState } from "react";
import { ChevronDown, Truck } from "lucide-react";

const countries = [
  { name: "India", dial: "+91", min: 10, max: 10 },
  { name: "United Arab Emirates", dial: "+971", min: 9, max: 9 },
  { name: "United Kingdom", dial: "+44", min: 10, max: 10 },
  { name: "United States", dial: "+1", min: 10, max: 10 },
  { name: "Switzerland", dial: "+41", min: 9, max: 9 },
];

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  postal: "",
  country: "",
  phone: "",
};

const field =
  "h-[34px] w-full border border-transparent bg-neutral-200 px-3 text-[11px] outline-none placeholder:text-neutral-500 transition-colors";

function ShippingForm({ onContinue, initialValues }) {
  const [form, setForm] = useState(initialValues || empty);
  const [errors, setErrors] = useState({});

  const selected = countries.find((c) => c.name === form.country);

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim() || form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must contain at least 2 characters";
    }

    if (!form.lastName.trim() || form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must contain at least 2 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.city.trim() || form.city.trim().length < 2) {
      newErrors.city = "Please enter a valid city";
    }

    if (!/^[a-zA-Z0-9 -]{3,12}$/.test(form.postal.trim())) {
      newErrors.postal = "Please enter a valid postal code";
    }

    if (!form.country) {
      newErrors.country = "Please select a country";
    }

    // Phone: count digits only, and use the selected country's rule
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (selected) {
      if (digits.length < selected.min || digits.length > selected.max) {
        newErrors.phone =
          selected.min === selected.max
            ? `Enter a valid ${selected.min}-digit number for ${selected.name}`
            : `Enter ${selected.min} to ${selected.max} digits for ${selected.name}`;
      }
    } else if (digits.length < 7 || digits.length > 15) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // changing the country changes the phone rule, so clear that error too
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "country" ? { phone: "" } : {}),
    }));
  };

  // Phone: allow digits and spaces only
  const handlePhone = (e) => {
    const cleaned = e.target.value.replace(/[^\d\s]/g, "");
    setForm((prev) => ({ ...prev, phone: cleaned }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const cleanedForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()])
    );

    // save the phone with its country code, as text
    cleanedForm.phone = `${selected ? selected.dial : ""}${form.phone.replace(/\D/g, "")}`;

    onContinue(cleanedForm);
  };

  const cls = (name, extra = "") =>
    `${field} ${extra} ${errors[name] ? "!border-red-500" : ""}`;

  const describe = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="flex items-center gap-3 text-[12px]">
        <Truck size={16} strokeWidth={1.5} />
        Shipping Information
      </h2>

      <div className="mt-5 space-y-2.5">
        {/* First Name and Last Name */}
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={cls("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={describe("firstName")}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-[11px] text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={cls("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={describe("lastName")}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-[11px] text-red-500">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={cls("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-[11px] text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* City, Postal Code and Country */}
        <div className="grid gap-2.5 sm:grid-cols-3">
          <div>
            <input
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className={cls("city")}
              aria-invalid={!!errors.city}
              aria-describedby={describe("city")}
            />
            {errors.city && (
              <p id="city-error" className="mt-1 text-[11px] text-red-500">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <input
              name="postal"
              type="text"
              value={form.postal}
              onChange={handleChange}
              placeholder="Postal Code"
              className={cls("postal")}
              aria-invalid={!!errors.postal}
              aria-describedby={describe("postal")}
            />
            {errors.postal && (
              <p id="postal-error" className="mt-1 text-[11px] text-red-500">
                {errors.postal}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className={cls(
                  "country",
                  `appearance-none ${form.country ? "" : "text-neutral-500"}`
                )}
                aria-invalid={!!errors.country}
                aria-describedby={describe("country")}
              >
                <option value="">Country</option>
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />
            </div>
            {errors.country && (
              <p id="country-error" className="mt-1 text-[11px] text-red-500">
                {errors.country}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <div className="flex gap-2.5">
            {selected && (
              <span className="flex h-[34px] items-center bg-neutral-200 px-3 text-[11px]">
                {selected.dial}
              </span>
            )}
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={handlePhone}
              placeholder="Phone Number"
              className={cls("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={describe("phone")}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-[11px] text-red-500">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <button
        type="submit"
        className="mt-6 h-[30px] w-full cursor-pointer bg-gold text-[10px] font-medium uppercase transition-opacity hover:opacity-90"
      >
        Continue to Payment
      </button>
    </form>
  );
}

export default ShippingForm;