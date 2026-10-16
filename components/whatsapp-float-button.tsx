"use client";

import { IconBrandWhatsappFilled } from "@tabler/icons-react";
import { siteConfig } from "@/config/site";

export function WhatsappFloatButton() {
  return (
    <a
      href={siteConfig.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our software architects on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
    >
      <IconBrandWhatsappFilled className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}

export default WhatsappFloatButton;
