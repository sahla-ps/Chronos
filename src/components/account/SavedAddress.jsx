
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const countries = [
    "India",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Switzerland",
];

const emptyForm = {
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    email: "",
    mobile: "",
};

const inputClass =
    "mt-2 h-[40px] w-full border border-neutral-200 px-6 text-[12px] outline-none placeholder:text-neutral-400 focus:border-maroon";

const labelClass = "text-[10px]";
const errorClass = "mt-1 text-[10px] text-red-500";

function SavedAddress({ profileData }) {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            firstName: "Bessie",
            lastName: "Cooper",
            address: "2646 Royal Ln. Mesa, New Jersey 23568",
            country: "United States",
            email: "bessie@example.com",
            mobile: "+1 9876543213",
        },
    ]);

    const [form, setForm] = useState(() => ({
        ...emptyForm,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        mobile: profileData.mobile,
    }));
    const [errors, setErrors] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [saved, setSaved] = useState(false);

    // Update form fields
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

        setSaved(false);
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!form.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!form.country) {
            newErrors.country = "Please select a country";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            newErrors.email = "Enter a valid email address";
        }

        const digits = form.mobile.replace(/\D/g, "");

        if (!form.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (digits.length < 7 || digits.length > 15) {
            newErrors.mobile = "Enter a valid mobile number";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Add or update address
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (editingId) {
            setAddresses((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...form, id: editingId } : item
                )
            );
        } else {
            setAddresses((prev) => [
                ...prev,
                { ...form, id: Date.now() },
            ]);
        }

        setForm(emptyForm);
        setErrors({});
        setEditingId(null);
        setSaved(true);
    };

    // Edit address
    const handleEdit = (item) => {
        setForm({
            firstName: item.firstName,
            lastName: item.lastName,
            address: item.address,
            country: item.country,
            email: item.email,
            mobile: item.mobile,
        });

        setEditingId(item.id);
        setErrors({});
        setSaved(false);
    };

    // Delete address
    const handleDelete = (id) => {
        setAddresses((prev) =>
            prev.filter((item) => item.id !== id)
        );

        if (editingId === id) {
            setForm(emptyForm);
            setEditingId(null);
            setErrors({});
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setForm(emptyForm);
        setEditingId(null);
        setErrors({});
        setSaved(false);
    };

    return (
        <div className="max-w-[540px]">

            {/* Saved Address List */}
            <div className="space-y-4">
                {addresses.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col justify-between gap-4 border border-neutral-200 px-6 py-5 sm:flex-row sm:items-center"
                    >
                        <div>
                            <h3 className="text-[12px] font-semibold">
                                {item.firstName} {item.lastName}
                            </h3>

                            <p className="mt-1 text-[11px] text-neutral-500">
                                {item.address}
                            </p>

                            <p className="mt-1 text-[11px] text-neutral-500">
                                {item.country}
                            </p>
                        </div>

                        <div className="flex items-center gap-5 text-[11px]">
                            <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className="flex cursor-pointer items-center gap-1 hover:text-maroon"
                            >
                                <Pencil size={12} />
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="flex cursor-pointer items-center gap-1 text-red-500"
                            >
                                <Trash2 size={12} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Address Form */}
            <h2 className="mb-6 mt-8 text-[12px] font-semibold">
                {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit} noValidate>

                {/* First Name and Last Name */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass} htmlFor="firstName">
                            First Name
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Ex. John"
                            className={`${inputClass} ${errors.firstName ? "border-red-500" : ""
                                }`}
                            aria-invalid={Boolean(errors.firstName)}
                        />

                        {errors.firstName && (
                            <p className={errorClass}>{errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="lastName">
                            Last Name
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Ex. Doe"
                            className={`${inputClass} ${errors.lastName ? "border-red-500" : ""
                                }`}
                            aria-invalid={Boolean(errors.lastName)}
                        />

                        {errors.lastName && (
                            <p className={errorClass}>{errors.lastName}</p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div className="mt-5">
                    <label className={labelClass} htmlFor="address">
                        Address
                    </label>

                    <input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className={`${inputClass} ${errors.address ? "border-red-500" : ""
                            }`}
                        aria-invalid={Boolean(errors.address)}
                    />

                    {errors.address && (
                        <p className={errorClass}>{errors.address}</p>
                    )}
                </div>

                {/* Country */}
                <div className="mt-5">
                    <label className={labelClass} htmlFor="country">
                        Country
                    </label>

                    <select
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className={`${inputClass} bg-white ${errors.country ? "border-red-500" : ""
                            }`}
                        aria-invalid={Boolean(errors.country)}
                    >
                        <option value="">Select Country</option>

                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    {errors.country && (
                        <p className={errorClass}>{errors.country}</p>
                    )}
                </div>

                {/* Email */}
                <div className="mt-5">
                    <label className={labelClass} htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={`${inputClass} ${errors.email ? "border-red-500" : ""
                            }`}
                        aria-invalid={Boolean(errors.email)}
                    />

                    {errors.email && (
                        <p className={errorClass}>{errors.email}</p>
                    )}
                </div>

                {/* Mobile */}
                <div className="mt-5">
                    <label className={labelClass} htmlFor="mobile">
                        Mobile
                    </label>

                    <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        inputMode="tel"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="+91 9876543213"
                        className={`${inputClass} ${errors.mobile ? "border-red-500" : ""
                            }`}
                        aria-invalid={Boolean(errors.mobile)}
                    />

                    {errors.mobile && (
                        <p className={errorClass}>{errors.mobile}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center gap-4">
                    <button
                        type="submit"
                        className="h-[40px] min-w-[118px] cursor-pointer bg-maroon px-6 text-[12px] text-white transition-opacity hover:opacity-90"
                    >
                        {editingId ? "Update Address" : "Add Address"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-[12px] text-neutral-500 hover:text-black"
                        >
                            Cancel
                        </button>
                    )}

                    {saved && (
                        <span className="text-[12px] text-neutral-500">
                            Saved.
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}

export default SavedAddress;
