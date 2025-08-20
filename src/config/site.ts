export const SITE = {
  name: "RangoDeco",
  contact: {
    address: "53116 Mwanjelwa, Mbeya, Tanzania",
    phone: "+255745704892",
  },
  adminEmail: process.env.ADMIN_EMAIL ?? import.meta.env.VITE_ADMIN_EMAIL ?? '',
};

export type SiteConfig = typeof SITE;
