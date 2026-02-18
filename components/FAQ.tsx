"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is FXD/04/2026 really legal? Is this official?",
    answer:
      "Yes, 100%. FXD/04/2026 is an official National Bank of Ethiopia (NBE) directive that became effective on February 12, 2026. It was publicly announced and is binding on all Ethiopian banks. This is not a workaround or loophole — it's official government policy designed specifically to support service exporters like you.",
  },
  {
    question: "Do I need a business license to qualify?",
    answer:
      "Not necessarily. The directive covers 'service exporters,' which includes individual freelancers providing digital services to international clients. However, requirements may vary slightly by bank. We recommend calling your preferred bank's FX department to confirm their specific requirements before applying. Some banks may ask for a trade license or business registration.",
  },
  {
    question: "What if I'm already using PayPal or Payoneer?",
    answer:
      "You can absolutely continue using PayPal, Payoneer, or Wise AND open an FX retention account. In fact, many freelancers will use their existing platforms to receive payments and then transfer to their FX account. Opening an FX retention account doesn't require you to abandon your current setup — it adds options and legal protection on top.",
  },
  {
    question: "Which Ethiopian banks offer FX retention accounts?",
    answer:
      "Several banks are already implementing FXD/04/2026, including Dashen Bank, Awash Bank, Bank of Abyssinia, and Commercial Bank of Ethiopia. Requirements and availability may differ by branch. Our PDF package includes contact information for each bank's FX department. Call ahead to confirm their current process.",
  },
  {
    question: "How long does opening an FX retention account take?",
    answer:
      "Typically 2-4 weeks from application to fully activated account. This includes document review, KYC verification, and account setup. The international card (Visa/Mastercard) application is usually a separate process that takes an additional 2-4 weeks after account opening. Our PDF includes a detailed week-by-week timeline.",
  },
  {
    question: "Is there a minimum deposit required?",
    answer:
      "No! This is one of the most important changes in FXD/04/2026. Previous regulations required minimum deposits that made FX accounts inaccessible to many freelancers. FXD/04/2026 explicitly removes all minimum deposit requirements. Any qualifying service exporter can open an account regardless of their earnings level.",
  },
  {
    question: "Can I convert my USD to birr anytime?",
    answer:
      "Yes. You have full control over your FX retention account. You can hold USD indefinitely, convert to ETB at any time at the official bank rate, or spend directly in USD using your international Visa/Mastercard. You are never forced to convert — that's the 'retention' part of the account.",
  },
  {
    question: "What about taxes on my foreign earnings?",
    answer:
      "We strongly recommend consulting a licensed Ethiopian tax professional for your specific situation. In general, moving to formal channels actually helps you stay tax-compliant, as you'll have proper documentation of all income. The formal route provides bank statements and transaction records that can serve as a foundation for tax compliance.",
  },
  {
    question: "What if my bank hasn't heard of FXD/04/2026?",
    answer:
      "If a bank employee is unfamiliar with FXD/04/2026, ask to speak with the Foreign Exchange Department manager specifically. Bring your PDF documentation package (from Netsalancer) which includes the directive citation and key provisions. If one branch is unresponsive, try a main branch or a different bank — they are all required to comply with NBE directives.",
  },
  {
    question: "How much does Netsalancer charge for this?",
    answer:
      "The PDF documentation package and all calculators are completely free. Netsalancer is an information platform — we don't charge any fees for helping you understand and access FXD/04/2026 benefits. Our future Netsalancer platform (coming Q2 2026) will have its own pricing for account opening and card services, but accessing the directive itself is free.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-et-dark pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-et-green transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-et-green/10 text-et-green rounded-full px-4 py-2 text-sm font-semibold mb-4">
            ❓ Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-et-dark mb-4">
            Questions About FXD/04/2026
          </h2>
          <p className="text-gray-600 text-lg">
            Everything Ethiopian freelancers are asking about the new directive.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <div className="text-2xl mb-3">💬</div>
          <h3 className="font-bold text-et-dark mb-2">Still have questions?</h3>
          <p className="text-gray-600 text-sm mb-4">
            We&apos;re here to help Ethiopian freelancers navigate FXD/04/2026.
          </p>
          <a
            href="mailto:mikimuluw@gmail.com"
            className="bg-et-green text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-et-green-dark transition-colors inline-flex items-center gap-2"
          >
            📧 Email Us: mikimuluw@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
