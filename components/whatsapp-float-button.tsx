"use client"

import { IconBrandWhatsappFilled } from "@tabler/icons-react"

const WHATSAPP_NUMBER = "919309931886"

export function WhatsappFloatButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
    >
      <IconBrandWhatsappFilled className="h-7 w-7" />
    </a>
  )
}
