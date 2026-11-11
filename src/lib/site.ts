/**
 * Global site settings. Update these values once the client confirms them.
 * Anything marked TO CONFIRM is placeholder content.
 */
export const site = {
  name: "Mati Trading PLC",
  // TO CONFIRM: final production domain
  url: "https://matitrading.com",
  // Contact form submissions are delivered here (via FormSubmit.co) and copied to formCc.
  // FormSubmit sends a one-time activation email to formEmail on the first submission.
  formEmail: "ardaajilaa@yahoo.com",
  formCc: "borugelchu@yahoo.com",
  contact: {
    emails: ["ardaajilaa@yahoo.com", "borugelchu@yahoo.com"],
    phones: ["+251 978 325 200", "+251 951 787 171", "+251 911 743 602"],
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
