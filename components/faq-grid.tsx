"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle } from "lucide-react";

const ROMAN_NUMERALS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI"
];

export function FaqGrid({ faqs }: { faqs: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search questions or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 bg-background/80 dark:bg-slate-900/80 border-border/80 focus:border-amber-500 rounded-xl font-sans text-sm shadow-sm"
        />
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 classical-card rounded-2xl p-8 border border-border">
          <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-serif text-lg font-bold text-foreground">No matching questions found</p>
          <p className="text-sm text-muted-foreground mt-1 font-sans">
            Try adjusting your search terms or reach out directly to our team.
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const roman = ROMAN_NUMERALS[index % ROMAN_NUMERALS.length] || `${index + 1}`;
            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="classical-card classical-frame border border-border/80 hover:border-amber-400/50 rounded-2xl px-5 sm:px-7 py-2 transition-all bg-background/90 dark:bg-slate-900/85 backdrop-blur-xl shadow-md data-[state=open]:border-amber-500/50"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-left font-serif text-base sm:text-lg font-bold text-foreground flex items-center gap-3">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="font-serif text-xs font-black px-2.5 py-0.5 rounded-lg border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 shrink-0">
                      {roman}
                    </span>
                    <span className="leading-snug">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed pt-1 pb-4 pl-9 sm:pl-10 pr-2 border-t border-border/40 mt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

export default FaqGrid;
