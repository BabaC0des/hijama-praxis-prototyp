// Editable content lives in src/data/*.json (the CMS writes there).
import site from "./data/site.json";

export const SITE = site;

export const BOOKING =
  "https://app.healthadvisor.ch/bookings/9dcb36f1aca440c89dacd7bbfc4e072a0908124e/treatment?language=de";

const digits = site.phone.replace(/\D/g, "").replace(/^0/, ""); // "076 …" -> "76…"
export const PHONE = site.phone;
export const PHONE_HREF = "tel:+41" + digits;
export const WHATSAPP = "https://wa.me/41" + digits;
export const EMAIL = site.email;
export const ADDRESS = site.address;
export const MAPS = "https://maps.google.com/?q=" + encodeURIComponent(site.address);

export const NAV = [
  { href: "/hijama", label: "Hijama" },
  { href: "/akupressur", label: "Akupressur" },
  { href: "/massage", label: "Massage" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/preise", label: "Preise" },
  { href: "/kontakt", label: "Kontakt" },
];
