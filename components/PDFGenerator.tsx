"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, Loader2, CheckCircle } from "lucide-react";
import { type PDFFormData } from "@/lib/pdf-generator";

const schema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(9, "Please enter a valid phone number")
    .regex(/^(\+251|0)[0-9]{9}$/, "Use Ethiopian format: +251912345678 or 0912345678"),
  monthlyEarnings: z
    .string()
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Enter a valid monthly earnings amount",
    }),
  specialization: z.string().min(1, "Please select your specialization"),
  yearsExperience: z.string().min(1, "Please select years of experience"),
  clientCountries: z.string().min(1, "Please enter your main client countries"),
  preferredBank: z.string().min(1, "Please select your preferred bank"),
  tinNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const specializations = [
  "Software Development",
  "Web Design / UI-UX",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "Video Editing",
  "Virtual Assistance",
  "Consulting / Strategy",
  "Data Analysis",
  "Other",
];

const banks = [
  "Dashen Bank",
  "Awash Bank",
  "Bank of Abyssinia",
  "Commercial Bank of Ethiopia",
  "Other",
];

const experienceOptions = ["< 1 year", "1-2 years", "2-5 years", "5-10 years", "10+ years"];

const clientCountriesOptions = [
  "USA",
  "UK",
  "EU (Germany, France, etc.)",
  "Canada",
  "Australia",
  "Middle East",
  "Multiple Countries",
];

export default function PDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferredBank: "",
      specialization: "",
      yearsExperience: "",
      clientCountries: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const { generatePDF } = await import("@/lib/pdf-generator");
      await generatePDF(data as PDFFormData);
      setWaitlistEmail(data.email);
      setSuccess(true);

      // Fire confetti
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#009639", "#FCDD09", "#DA121A"],
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-et-green focus:border-transparent transition-all placeholder:text-gray-400";
  const errorClass = "text-red-500 text-xs mt-1";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (success) {
    return (
      <section id="pdf-generator" className="py-20 px-4 sm:px-6 lg:px-8 bg-et-green">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-10 shadow-2xl">
            <div className="w-20 h-20 bg-et-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-et-green" />
            </div>
            <h2 className="text-3xl font-black text-et-dark mb-3">
              Your Documents Are Ready! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Your FX Freedom Documentation Package has been downloaded. Use it
              to open your FX retention account at {getValues("preferredBank")} today.
            </p>
            <div className="bg-et-green/5 border border-et-green/20 rounded-xl p-5 mb-6 text-left">
              <h3 className="font-bold text-et-green mb-3">What&apos;s in your PDF:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ Personalized bank cover letter (ready to print)</li>
                <li>✅ FXD/04/2026 key provisions summary</li>
                <li>✅ Complete documentation checklist</li>
                <li>✅ Step-by-step implementation timeline</li>
                <li>✅ Annual earnings projection worksheet</li>
              </ul>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Want more FX Freedom tips? Join the waitlist below ↓
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="text-et-green text-sm underline hover:no-underline"
            >
              Generate another PDF
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pdf-generator" className="py-20 px-4 sm:px-6 lg:px-8 bg-et-green">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 text-white text-sm font-semibold mb-4">
            <Download size={16} />
            Free Documentation Package
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Get Your Complete FX Freedom Documents
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Professional, personalized application materials to open your FX
            retention account today. Free, instant download.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {[
              "Cover Letter",
              "Directive Summary",
              "Document Checklist",
              "Timeline",
              "Earnings Worksheet",
            ].map((item) => (
              <span
                key={item}
                className="bg-white/20 border border-white/30 px-3 py-1 rounded-full text-white text-xs font-medium"
              >
                📄 {item}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("fullName")}
                placeholder="As on your National ID"
                className={inputClass}
              />
              {errors.fullName && (
                <p className={errorClass}>{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>
                Phone (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone")}
                placeholder="+251912345678"
                className={inputClass}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>

            {/* Monthly Earnings */}
            <div>
              <label className={labelClass}>
                Monthly USD Earnings <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  $
                </span>
                <input
                  {...register("monthlyEarnings")}
                  type="number"
                  placeholder="500"
                  className={`${inputClass} pl-8`}
                />
              </div>
              {errors.monthlyEarnings && (
                <p className={errorClass}>{errors.monthlyEarnings.message}</p>
              )}
            </div>

            {/* Years experience */}
            <div>
              <label className={labelClass}>
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <select {...register("yearsExperience")} className={inputClass}>
                <option value="">Select years...</option>
                {experienceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.yearsExperience && (
                <p className={errorClass}>{errors.yearsExperience.message}</p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <label className={labelClass}>
                Freelance Specialization <span className="text-red-500">*</span>
              </label>
              <select {...register("specialization")} className={inputClass}>
                <option value="">Select specialization...</option>
                {specializations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <p className={errorClass}>{errors.specialization.message}</p>
              )}
            </div>

            {/* Client Countries */}
            <div>
              <label className={labelClass}>
                Main Client Countries <span className="text-red-500">*</span>
              </label>
              <select {...register("clientCountries")} className={inputClass}>
                <option value="">Select primary location...</option>
                {clientCountriesOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.clientCountries && (
                <p className={errorClass}>{errors.clientCountries.message}</p>
              )}
            </div>

            {/* Preferred Bank */}
            <div>
              <label className={labelClass}>
                Preferred Bank <span className="text-red-500">*</span>
              </label>
              <select {...register("preferredBank")} className={inputClass}>
                <option value="">Select bank...</option>
                {banks.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.preferredBank && (
                <p className={errorClass}>{errors.preferredBank.message}</p>
              )}
            </div>

            {/* TIN Number (optional) */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                TIN Number{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                {...register("tinNumber")}
                placeholder="Your tax identification number (if registered)"
                className={inputClass}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-et-green text-white py-4 rounded-xl font-bold text-lg hover:bg-et-green-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Generating Your Documents...
                </>
              ) : (
                <>
                  <Download size={24} />
                  Generate & Download Free PDF Package
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Your information is used only to personalize your PDF. We never
              share your data.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
