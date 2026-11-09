/**
 * Global site settings. Update these values once the client confirms them.
 * Anything marked TO CONFIRM is placeholder content.
 */
export const site = {
  name: "Mati Trading PLC",
  // TO CONFIRM: final production domain
  url: "https://matitrading.com",
  // Contact form submissions are delivered here (via FormSubmit.co).
  // TO CONFIRM: replace with the client's address when available.
  formEmail: "contact@horan.tech",
  contact: {
    email: "contact@horan.tech", // TO CONFIRM
    phone: "+251 000 000 000", // TO CONFIRM
    whatsapp: "", // TO CONFIRM e.g. "251900000000" (digits only) — hidden while empty
    address: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ",
      om: "Finfinnee, Itoophiyaa",
    },
    mapQuery: "Addis Ababa, Ethiopia", // TO CONFIRM: exact office address
  },
  social: {
    linkedin: "", // TO CONFIRM — hidden while empty
    facebook: "",
    instagram: "",
  },
} as const;
