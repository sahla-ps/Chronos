const steps = ["Shipping", "Payment", "Review"];

function Stepper({ step }) {
  return (
    <ol className="mt-5 flex items-center gap-3 text-[11px]">
      {steps.map((label, i) => {
        const number = i + 1;
        const reached = number <= step;
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-medium ${
                reached ? "bg-gold text-black" : "bg-neutral-300 text-white"
              }`}
            >
              {number}
            </span>
            <span className={reached ? "text-black" : "text-neutral-400"}>{label}</span>
            {number < steps.length && <span className="h-px w-[50px] bg-neutral-300" />}
          </li>
        );
      })}
    </ol>
  );
}

export default Stepper;