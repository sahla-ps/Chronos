
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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

    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Signup details:", form);

    // We'll connect this form to MongoDB in the next step.
    setMessage("Form validated successfully.");
  };

  const inputClass =
    "h-[42px] w-full rounded-[4px] bg-neutral-100 px-4 text-[12px] outline-none transition-colors focus:ring-1 focus:ring-maroon";

  const errorClass = "mt-1 text-[10px] text-red-500";

  return (
    <>
      <Navbar solid />

      <main className="flex min-h-[600px] flex-col items-center px-5 py-16 md:py-20">
        <div className="w-full max-w-[350px]">
          <div className="mb-9 text-center">
            <h1 className="font-display text-[26px]">
              Create Account
            </h1>

            <p className="mt-1 text-[11px] text-neutral-500">
              Join our exclusive community of collectors
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-[10px]"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`${inputClass} ${
                  errors.name ? "border border-red-500" : ""
                }`}
              />

              {errors.name && (
                <p className={errorClass}>{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-[10px]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`${inputClass} ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />

              {errors.email && (
                <p className={errorClass}>{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-[10px]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`${inputClass} pr-11 ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className={errorClass}>{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="h-[42px] w-full cursor-pointer rounded-[4px] bg-maroon text-[12px] font-medium text-cream transition-opacity hover:opacity-90"
            >
              Sign up
            </button>

            {message && (
              <p className="mt-3 text-center text-[11px] text-green-700">
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-[11px] text-neutral-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="ml-1 text-red-600 hover:underline"
            >
              Sign in now
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Signup;
