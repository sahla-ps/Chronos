
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [form, setForm] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address";
    }

    if (!form.password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMessage("Form validated successfully.");
      // Backend login connection will be added later.
    }
  };

  const inputClass =
    "h-[42px] w-full rounded-[4px] bg-neutral-100 px-3 text-[12px] outline-none focus:ring-1 focus:ring-maroon";

  return (
    <>
      <Navbar solid />

      <main className="min-h-[480px] px-5 py-16 md:min-h-[480px] md:py-20">
        <div className="mx-auto w-full max-w-[350px]">

          {/* Heading */}
          <div className="mb-9 text-center">
            <h1 className="font-display text-[26px] font-semibold">
              Welcome Back
            </h1>

            <p className="mt-1 text-[11px] text-neutral-500">
              Sign in to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="mb-3">
              <label className="mb-1 block text-[10px] text-neutral-600">
                Username
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className={inputClass}
              />

              {errors.email && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-[10px] text-neutral-600">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`${inputClass} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                >
                  {showPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mt-3 text-right">
              <Link
                to="/forgot-password"
                className="text-[10px] text-neutral-500 hover:text-maroon"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-5 h-[42px] w-full rounded-[4px] bg-[#171717] text-[12px] font-medium text-white transition hover:bg-maroon"
            >
              Sign in
            </button>

            {message && (
              <p className="mt-3 text-center text-[11px] text-green-600">
                {message}
              </p>
            )}
          </form>

          {/* Signup Link */}
          <p className="mt-7 text-center text-[11px] text-neutral-600">
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-brand-red hover:underline"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;
