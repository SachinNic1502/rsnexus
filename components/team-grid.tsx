"use client";

import Image from "next/image";
import { Mail, Phone, Linkedin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMemberItem {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  email: string;
  phone?: string;
}

export function TeamGrid({ teamMembers }: { teamMembers: TeamMemberItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center max-w-7xl mx-auto">
      {teamMembers.map((member, idx) => (
        <motion.div
          key={member.name}
          className="relative group rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 backdrop-blur-xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-[0_0_35px_-8px_rgba(56,189,248,0.25)] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -4 }}
        >
          {/* Subtle ambient light sweep on hover */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
            <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="flex flex-col items-center z-10 w-full">
            {/* Avatar with Radiant Halo Ring */}
            <div className="relative mb-4">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-cyan-400 to-indigo-500 opacity-40 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-slate-900 shadow-md">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="absolute bottom-0 right-1 flex h-3.5 w-3.5 rounded-full bg-slate-950 p-0.5">
                <span className="h-full w-full rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </span>
            </div>

            {/* Name & Role Pill */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
              {member.name}
            </h3>

            <div className="mt-1 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide bg-primary/10 text-primary dark:text-cyan-400 border border-primary/20">
                <Sparkles className="w-2.5 h-2.5 text-cyan-500 dark:text-cyan-400" />
                {member.role}
              </span>
            </div>

            {/* Bio */}
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
              {member.bio}
            </p>
          </div>

          {/* Social / Contact Links Footer */}
          <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 z-10">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 transition-colors border border-slate-200/50 dark:border-slate-700/50"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400 hover:bg-primary/10 transition-colors border border-slate-200/50 dark:border-slate-700/50"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                aria-label={`Call ${member.name}`}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors border border-slate-200/50 dark:border-slate-700/50"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
