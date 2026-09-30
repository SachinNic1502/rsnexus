import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data-fetchers";
import { TeamGrid } from "@/components/team-grid";

export const metadata: Metadata = {
  title: "Meet Our Team & Leadership | RSNexus",
  description:
    "Meet the experienced software engineers, architects, and technical leaders behind RSNexus. Direct founder-led engineering without account management filters.",
  alternates: {
    canonical: "https://rsnexus.in/team",
  },
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-center dark:text-white transition-colors">
        Meet Our Team
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto transition-colors leading-relaxed">
        RSNexus is a driven startup founded by experienced engineering professionals, committed to helping businesses thrive with innovative technology and tailored digital solutions.
      </p>

      <TeamGrid teamMembers={teamMembers as any} />
    </main>
  );
}