import { useState } from "react";
import { Send } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-white px-6 py-20 text-black md:px-[75px]">
      <div className="mx-auto flex max-w-[480px] flex-col items-center text-center">
        <p className="text-[11px] uppercase tracking-wide">Stay Connected</p>

        <h2 className="mt-2 font-display text-[28px] font-normal md:text-[32px]">
          Join Our Inner Circle
        </h2>

        <p className="mt-3 text-[12px] text-neutral-500">
          Be the first to know about new acquisitions, private sales, and
          exclusive events.
        </p>

        {subscribed ? (
          <p className="mt-6 text-[13px] font-medium text-brand-red">
            Thank you. You're now part of the inner circle.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-10 flex-1 bg-neutral-200 px-4 text-[11px] outline-none placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 bg-gold px-6 text-[10px] font-medium uppercase tracking-wide transition-opacity hover:opacity-90"
            >
              <Send size={12} />
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-[9px] text-neutral-500">
          By subscribing, you agree to our Privacy Policy and consent to
          receive updates.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;