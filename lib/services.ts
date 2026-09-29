import servicesData from "@/data/services.json";
import { Code, Layers, Smartphone, Palette, Cloud, Brain, LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: string[];
  deliverables: string;
  typicalTimeline: string;
}

export const iconMap: Record<string, LucideIcon> = {
  Code,
  Layers,
  Smartphone,
  Palette,
  Cloud,
  Brain,
};

export function getServices(): ServiceItem[] {
  return servicesData.services as ServiceItem[];
}

export function getServiceById(id: string): ServiceItem | undefined {
  return getServices().find((s) => s.id === id);
}

export function getServiceIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Code;
}
