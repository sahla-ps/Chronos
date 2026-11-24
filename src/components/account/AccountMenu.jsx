const items = ["My Profile", "My Order", "Saved Address", "Change Password", "Logout"];

function AccountMenu({ active, onSelect }) {
  return (
    <nav
      aria-label="Account"
      className="md:border-r md:border-neutral-200 md:py-5 md:pl-[68px] md:pr-10"
    >
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item}>
            <button
              onClick={() => onSelect(item)}
              className={`h-[40px] w-full cursor-pointer border px-6 text-left text-[12px] transition-colors ${
                active === item
                  ? "border-maroon bg-maroon text-white"
                  : "border-neutral-200 bg-white hover:bg-neutral-50"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav> 
  );
}

export default AccountMenu;