"use client"
import Image from "next/image"
import { Mail, Phone, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Sachin Rathod",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Entrepreneur and tech enthusiast with a vision to empower Indian startups through innovative digital solutions. Passionate about building agile teams and delivering value.",
    linkedin: "https://www.linkedin.com/in/sachin-rathod-b1b1b1b1b1/",
    email: "sachin@rsnecus.in",
    phone: "+91 98260 00000",
  },
  {
    name: "Kushagra Ranjan",
    role: "CTO & Co-Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Startup technology leader focused on scalable cloud, AI, and full stack solutions. Dedicated to helping new businesses grow with robust, modern tech.",
    linkedin: "https://www.linkedin.com/in/kushagra-ranjan-b1b1b1b1b1/",
    email: "kushagra@rsnecus.in",
    phone: "+91 98260 00001",
  }
]

export default function TeamPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-white transition-colors">Meet Our Founders</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto transition-colors">
        RSNecus is a passionate startup founded by experienced professionals dedicated to empowering Indian businesses with cutting-edge technology and personalized solutions.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
  {teamMembers.map((member, idx) => (
    <motion.div
      key={member.name}
      className="relative group bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 flex flex-col items-center transition-colors overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Holographic hover effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-0">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-cyan-300/30 to-transparent rotate-[-45deg] opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-700 ease-out" />
      </div>

      {/* Content */}
      <motion.div
        className="w-24 h-24 relative mb-4 z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="rounded-full object-cover border-4 border-primary/30 dark:border-primary/60"
        />
      </motion.div>
      <h2 className="text-xl font-semibold dark:text-white z-10">{member.name}</h2>
      <p className="text-primary font-medium z-10">{member.role}</p>
      <p className="text-gray-600 dark:text-gray-300 text-center mt-2 z-10">{member.bio}</p>
      <div className="flex flex-col items-center gap-2 mt-3 z-10">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
          <Mail className="w-4 h-4" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
          <Phone className="w-4 h-4" />
          <span>{member.phone}</span>
        </div>
      </div>
    </motion.div>
  ))}
</div>

    </main>
  )
}