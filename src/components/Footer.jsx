import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const socials = [
    { id: 1, icon: FaFacebookF, label: "Facebook" },
    { id: 2, icon: FaTwitter, label: "Twitter" },
    { id: 3, icon: FaLinkedinIn, label: "LinkedIn" },
    { id: 4, icon: FaInstagram, label: "Instagram" },
];

const columns = [
    {
        id: 1,
        title: "Collections",
        links: ["Timepieces", "Accessories", "Fine Art", "New Arrivals", "Featured"],
    },
    {
        id: 2,
        title: "Services",
        links: ["My Account", "Order Tracking", "Warranty", "Returns & Exchanges", "FAQ"],
    },
];

function Footer() {
    return (
        <footer className="relative overflow-hidden rounded-t-[32px] bg-maroon px-6 pt-12 text-cream md:px-[60px]">
            <div className="rounded-[32px] border border-white/10 px-6 py-10 md:px-[68px]">
                {/* Top row */}
                <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                    {/* Left: brand */}
                    <div className="max-w-[270px]">
                        <a href="/" className="font-logo text-[32px] tracking-[0.08em]">
                            CHRONOS
                        </a>
                        <p className="mt-4 text-[11px] leading-relaxed">
                            Curating the world's finest timepieces, accessories, and art
                            since 1892. Each piece tells a story of uncompromising
                            craftsmanship.
                        </p>

                        <div className="mt-5 flex gap-3">
                            {socials.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={s.id}
                                        href="#"
                                        aria-label={s.label}
                                        className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-black/70 transition-colors hover:bg-black"
                                    >
                                        <Icon size={12} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: link columns */}
                    <div className="flex flex-wrap gap-10 md:gap-[48px]">
                        {columns.map((col) => (
                            <div key={col.id}>
                                <h3 className="text-[16px] font-medium">{col.title}</h3>
                                <ul className="mt-3 space-y-2.5 text-[10px]">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="hover:underline">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Contact column (written by hand, it has icons) */}
                        <div>
                            <h3 className="text-[16px] font-medium">Contact Us</h3>
                            <ul className="mt-3 space-y-3 text-[10px]">
                                <li className="flex items-start gap-2">
                                    <MapPin size={11} className="mt-0.5 shrink-0" />
                                    <span>
                                        Sheikh Zayed Road, Dubai,
                                        <br />
                                        United Arab Emirates
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={11} className="shrink-0" />
                                    <span>+971 4 123 4567</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={11} className="shrink-0" />
                                    <span>concierge@chronos.ae</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider and bottom row */}
                <div className="mt-12 border-t border-white/30 pt-5">
                    <div className="flex flex-col gap-3 text-[11px] md:flex-row md:justify-between">
                        <p>© 2026 CHRONOS. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                            <a href="#" className="hover:underline">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Huge faded word, cropped at the bottom */}
            <p aria-hidden="true" className="pointer-events-none -mx-6 mt-8 h-[10vw] select-none overflow-hidden whitespace-nowrap text-center font-logo text-[16vw] leading-none tracking-normal text-white/5 md:-mx-[60px]" >CHRONOS</p>
        </footer>
    );
}

export default Footer;