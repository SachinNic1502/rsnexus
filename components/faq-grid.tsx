"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function FaqGrid({ faqs }: { faqs: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <Card className="p-6 h-full glass-card hover:border-primary/40 transition-colors">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{faq.question}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
