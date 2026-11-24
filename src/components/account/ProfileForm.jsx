import { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";

const countries = [
    { code: "IN", dial: "+91", name: "India", min: 10, max: 10 },
    { code: "AE", dial: "+971", name: "United Arab Emirates", min: 9, max: 9 },
    { code: "GB", dial: "+44", name: "United Kingdom", min: 10, max: 10 },
    { code: "US", dial: "+1", name: "United States", min: 10, max: 10 },
    { code: "CH", dial: "+41", name: "Switzerland", min: 9, max: 9 },
];

const base =
    "mt-2 h-[40px] w-full border px-6 text-[12px] outline-none placeholder:text-neutral-400";
const label = "text-[10px]";
const errorText = "mt-1 text-[10px] text-red-500";

function validate(f, dial) {
    const e = {};
    if (!f.firstName.trim()) e.firstName = "First name is required";
    if (!f.lastName.trim()) e.lastName = "Last name is required";

    if (!f.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address";

    const country = countries.find((c) => c.dial === dial);
    const digits = f.mobile.replace(/\D/g, "");
    if (!f.mobile.trim()) {
        e.mobile = "Mobile number is required";
    } else if (digits.length < country.min || digits.length > country.max) {
        e.mobile =
            country.min === country.max
                ? `Enter a valid ${country.min}-digit number for ${country.name}`
                : `Enter ${country.min} to ${country.max} digits for ${country.name}`;
    }
    return e;
}

function ProfileForm({ onSave, initialValues }) {
    const [form, setForm] = useState(() => ({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        ...initialValues,
    }));
    const [dial, setDial] = useState("+91");
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);

    const fileRef = useRef(null);
    const [photo, setPhoto] = useState(initialValues?.photo || null);      // preview URL
    const [photoError, setPhotoError] = useState("");

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setPhotoError("Please choose an image file");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setPhotoError("Image must be smaller than 2 MB");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPhoto(reader.result);
            setPhotoError("");
            setSaved(false);
        };

        reader.readAsDataURL(file);
        e.target.value = "";
    };

    // free the old preview from memory
    useEffect(() => {
        return () => {
            if (photo) URL.revokeObjectURL(photo);
        };
    }, [photo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
        setSaved(false);
    };

    const handleMobile = (e) => {
        const cleaned = e.target.value.replace(/[^\d\s]/g, "");
        setForm({ ...form, mobile: cleaned });
        if (errors.mobile) setErrors({ ...errors, mobile: "" });
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const found = validate(form, dial);
        setErrors(found);

        if (Object.keys(found).length > 0) return;

        const profile = {
            ...form,
            mobile: `${dial}${form.mobile.replace(/\D/g, "")}`,
            photo: photo || "",
        };

        onSave(profile);
        setSaved(true);
    };

    const cls = (name) =>
        `${base} ${errors[name] ? "border-red-500" : "border-neutral-200 focus:border-maroon"}`;

    return (
        <form onSubmit={handleSubmit} noValidate className="max-w-[540px]">
            <div className="relative h-[64px] w-[64px]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-300 text-[20px]">
                    {photo ? (
                        <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                    ) : form.firstName ? (
                        form.firstName[0].toUpperCase()
                    ) : (
                        "?"
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    aria-label="Change photo"
                    className="absolute -bottom-1 left-1/2 flex h-4 w-4 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow"
                >
                    <Camera size={10} />
                </button>

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                />
            </div>
            {photoError && <p role="alert" className="mt-2 text-[10px] text-red-500">{photoError}</p>}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="firstName" className={label}>First Name</label>
                    <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange}
                        placeholder="Ex. John" className={cls("firstName")} aria-invalid={Boolean(errors.firstName)} />
                    {errors.firstName && <p role="alert" className={errorText}>{errors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className={label}>Last Name</label>
                    <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange}
                        placeholder="Ex. Doe" className={cls("lastName")} aria-invalid={Boolean(errors.lastName)} />
                    {errors.lastName && <p role="alert" className={errorText}>{errors.lastName}</p>}
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="email" className={label}>Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="Email Address" className={cls("email")} aria-invalid={Boolean(errors.email)} />
                {errors.email && <p role="alert" className={errorText}>{errors.email}</p>}
            </div>

            <div className="mt-6">
                <label htmlFor="mobile" className={label}>Mobile</label>
                <div className="mt-2 flex gap-2">
                    <select
                        value={dial}
                        onChange={(e) => {
                            setDial(e.target.value);
                            if (errors.mobile) setErrors({ ...errors, mobile: "" });
                        }}
                        aria-label="Country code"
                        className="h-[40px] w-[110px] border border-neutral-200 bg-white px-2 text-[12px] outline-none focus:border-maroon"
                    >
                        {countries.map((c) => (
                            <option key={c.code} value={c.dial}>
                                {c.code} {c.dial}
                            </option>
                        ))}
                    </select>

                    <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        value={form.mobile}
                        onChange={handleMobile}
                        placeholder="9876543213"
                        aria-invalid={Boolean(errors.mobile)}
                        className={`h-[40px] w-full border px-6 text-[12px] outline-none placeholder:text-neutral-400 ${errors.mobile ? "border-red-500" : "border-neutral-200 focus:border-maroon"
                            }`}
                    />
                </div>
                {errors.mobile && <p role="alert" className={errorText}>{errors.mobile}</p>}
            </div>

            <div className="mt-8 flex items-center gap-4">
                <button type="submit"
                    className="h-[40px] w-[110px] cursor-pointer bg-maroon text-[12px] text-white transition-opacity hover:opacity-90">
                    Save
                </button>
                {saved && (
                    <p
                        role="status"
                        className="text-[12px] font-medium text-green-700"
                    >
                        <span className="mr-1">✓</span>
                        Your profile has been updated successfully.
                    </p>
                )}
            </div>
        </form>
    );
}

export default ProfileForm;