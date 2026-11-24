
import { useState } from "react";
import {
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

const emptyForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const inputClass =
  "h-[40px] w-full border border-neutral-200 px-10 pr-11 text-[12px] outline-none placeholder:text-neutral-400 focus:border-maroon";

const labelClass = "mb-2 block text-[10px]";
const errorClass = "mt-1 text-[10px] text-red-500";

function ChangePassword() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState({});
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

  const toggleVisibility = (name) => {
    setVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword =
        "Password must contain at least 8 characters";
    } else if (form.newPassword === form.currentPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Connect your backend password-change API here.
    // Do not log or store passwords in frontend storage.

    setMessage("Your password has been changed successfully.");

    setForm(emptyForm);
    setVisible({});
  };

  const renderPasswordField = (name, label, placeholder) => (
    <div className="mb-5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={13}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        />

        <input
          id={name}
          name={name}
          type={visible[name] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${inputClass} ${errors[name] ? "border-red-500" : ""
            }`}
          aria-invalid={Boolean(errors[name])}
        />

        <button
          type="button"
          onClick={() => toggleVisibility(name)}
          aria-label={visible[name] ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
        >
          {visible[name] ? (
            <Eye size={14} />
          ) : (
            <EyeOff size={14} />
          )}
        </button>
      </div>

      {errors[name] && (
        <p role="alert" className={errorClass}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-[500px]">
      <h2 className="mb-6 text-[12px] font-semibold">
        Current Password
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {renderPasswordField(
          "currentPassword",
          "Current Password",
          "Current Password"
        )}

        {renderPasswordField(
          "newPassword",
          "New Password",
          "New Password"
        )}

        {renderPasswordField(
          "confirmPassword",
          "Confirm Password",
          "Confirm Password"
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="h-[40px] min-w-[118px] cursor-pointer bg-maroon px-5 text-[12px] text-white transition-opacity hover:opacity-90"
          >
            Change Password
          </button>

          {message && (
            <p
              role="status"
              className="text-[11px] font-medium text-green-700"
            >
              ✓ {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
