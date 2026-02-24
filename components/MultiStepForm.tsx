"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type UserType = "business" | "rider";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  // Business
  businessName?: string;
  businessType?: string;
  city?: string;
  offersDelivery?: string;
  weeklyDeliveries?: string;
  biggestChallenge?: string;
  // Rider
  vehicleType?: string;
  deliveryExperience?: string;
  preferredHours?: string;
  expectedEarnings?: string;
}

const businessTypes = [
  "Restaurant / Café",
  "Retail",
  "Pharmacy",
  "Groceries",
  "Other",
];

const weeklyRange = ["1–10", "11–50", "51–100", "101–250", "250+"];

const vehicleOptions = ["Bike", "Car", "None"];
const earningsRange = ["Under £200", "£200–500", "£500–1000", "£1000+"];

export default function MultiStepForm() {
  const [userType, setUserType] = useState<UserType>("business");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  const update = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    if (!formData.phone.trim()) e.phone = "Phone is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (userType === "business") {
      if (!formData.businessName?.trim())
        e.businessName = "Business name is required.";
      if (!formData.businessType) e.businessType = "Please select a type.";
      if (!formData.city?.trim()) e.city = "City is required.";
      if (!formData.weeklyDeliveries)
        e.weeklyDeliveries = "Please select a range.";
    } else {
      if (!formData.city?.trim()) e.city = "City is required.";
      if (!formData.vehicleType) e.vehicleType = "Please select vehicle type.";
      if (!formData.expectedEarnings)
        e.expectedEarnings = "Please select a range.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setReferralLink(
      `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${formData.email?.replace(/@.*/, "")}`,
    );
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mx-auto max-w-lg">
      {/* Toggle */}
      <div className="mb-8 flex rounded-xl bg-white/10 p-1">
        <button
          type="button"
          onClick={() => setUserType("business")}
          className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
            userType === "business"
              ? "bg-white text-[#e0110c]"
              : "text-white hover:bg-white/10"
          }`}
        >
          I&apos;m a Business
        </button>
        <button
          type="button"
          onClick={() => setUserType("rider")}
          className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
            userType === "rider"
              ? "bg-white text-[#e0110c]"
              : "text-white hover:bg-white/10"
          }`}
        >
          I&apos;m a Rider
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full rounded-full bg-[#fcb900]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-white/90"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-[#fcb900]">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#fcb900]">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white/90"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                placeholder="+44 ..."
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-[#fcb900]">{errors.phone}</p>
              )}
            </div>
            <motion.button
              type="button"
              onClick={handleNext}
              className="mt-6 w-full rounded-xl bg-white py-3.5 font-semibold text-[#e0110c]"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {userType === "business" ? (
              <>
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-white/90"
                  >
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={formData.businessName ?? ""}
                    onChange={(e) => update("businessName", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                    placeholder="Your business name"
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-[#fcb900]">
                      {errors.businessName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-white/90"
                  >
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    value={formData.businessType ?? ""}
                    onChange={(e) => update("businessType", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white"
                  >
                    <option value="" className="bg-gray-900 text-gray-300">
                      Select type
                    </option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t} className="bg-gray-900">
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="mt-1 text-sm text-[#fcb900]">
                      {errors.businessType}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-white/90"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={formData.city ?? ""}
                    onChange={(e) => update("city", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                    placeholder="e.g. London"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-[#fcb900]">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">
                    Do you currently offer delivery?
                  </label>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="radio"
                        name="offersDelivery"
                        checked={formData.offersDelivery === "yes"}
                        onChange={() => update("offersDelivery", "yes")}
                        className="rounded-full border-white/50"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="radio"
                        name="offersDelivery"
                        checked={formData.offersDelivery === "no"}
                        onChange={() => update("offersDelivery", "no")}
                        className="rounded-full border-white/50"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="weeklyDeliveries"
                    className="block text-sm font-medium text-white/90"
                  >
                    Estimated weekly deliveries
                  </label>
                  <select
                    id="weeklyDeliveries"
                    value={formData.weeklyDeliveries ?? ""}
                    onChange={(e) => update("weeklyDeliveries", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white"
                  >
                    <option value="" className="bg-gray-900 text-gray-300">
                      Select range
                    </option>
                    {weeklyRange.map((r) => (
                      <option key={r} value={r} className="bg-gray-900">
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.weeklyDeliveries && (
                    <p className="mt-1 text-sm text-[#fcb900]">
                      {errors.weeklyDeliveries}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="biggestChallenge"
                    className="block text-sm font-medium text-white/90"
                  >
                    Biggest delivery challenge
                  </label>
                  <textarea
                    id="biggestChallenge"
                    value={formData.biggestChallenge ?? ""}
                    onChange={(e) => update("biggestChallenge", e.target.value)}
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                    placeholder="Optional"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="riderCity"
                    className="block text-sm font-medium text-white/90"
                  >
                    City
                  </label>
                  <input
                    id="riderCity"
                    type="text"
                    value={formData.city ?? ""}
                    onChange={(e) => update("city", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                    placeholder="e.g. Manchester"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-[#fcb900]">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">
                    Vehicle Type
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {vehicleOptions.map((v) => (
                      <label
                        key={v}
                        className={`flex cursor-pointer items-center rounded-lg border px-4 py-2 text-sm ${
                          formData.vehicleType === v
                            ? "border-white bg-white/20 text-white"
                            : "border-white/30 text-white/90"
                        }`}
                      >
                        <input
                          type="radio"
                          name="vehicleType"
                          value={v}
                          checked={formData.vehicleType === v}
                          onChange={() => update("vehicleType", v)}
                          className="sr-only"
                        />
                        {v}
                      </label>
                    ))}
                  </div>
                  {errors.vehicleType && (
                    <p className="mt-1 text-sm text-[#fcb900]">
                      {errors.vehicleType}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">
                    Delivery experience?
                  </label>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="radio"
                        name="deliveryExperience"
                        checked={formData.deliveryExperience === "yes"}
                        onChange={() => update("deliveryExperience", "yes")}
                        className="rounded-full"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="radio"
                        name="deliveryExperience"
                        checked={formData.deliveryExperience === "no"}
                        onChange={() => update("deliveryExperience", "no")}
                        className="rounded-full"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="preferredHours"
                    className="block text-sm font-medium text-white/90"
                  >
                    Preferred working hours
                  </label>
                  <input
                    id="preferredHours"
                    type="text"
                    value={formData.preferredHours ?? ""}
                    onChange={(e) => update("preferredHours", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder-white/50"
                    placeholder="e.g. Mornings, Evenings"
                  />
                </div>
                <div>
                  <label
                    htmlFor="expectedEarnings"
                    className="block text-sm font-medium text-white/90"
                  >
                    Expected weekly earnings range
                  </label>
                  <select
                    id="expectedEarnings"
                    value={formData.expectedEarnings ?? ""}
                    onChange={(e) => update("expectedEarnings", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-white"
                  >
                    <option value="" className="bg-gray-900 text-gray-300">
                      Select range
                    </option>
                    {earningsRange.map((r) => (
                      <option key={r} value={r} className="bg-gray-900">
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.expectedEarnings && (
                    <p className="mt-1 text-sm text-[#fcb900]">
                      {errors.expectedEarnings}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="flex gap-3 pt-2">
              <motion.button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-white/50 py-3.5 px-6 font-semibold text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                type="button"
                onClick={handleNext}
                className="flex-1 rounded-xl bg-white py-3.5 font-semibold text-[#e0110c]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && !submitted && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white">
              You&apos;re Early. That Matters.
            </h3>
            <p className="mt-4 text-white/90">
              We&apos;ll notify you before public launch and prioritise early
              members.
            </p>
            <p className="mt-6 text-sm text-white/80">
              Invite 3 businesses or riders to join the movement.
            </p>
            <motion.button
              type="button"
              onClick={handleSubmit}
              className="mt-8 w-full rounded-xl bg-white py-3.5 font-semibold text-[#e0110c]"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Share My Referral Link
            </motion.button>
          </motion.div>
        )}

        {step === 3 && submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-4xl">✓</div>
            <h3 className="mt-4 text-xl font-bold text-white">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 text-white/90">
              Check your email for your referral link and next steps.
            </p>
            {referralLink && (
              <div className="mt-6 rounded-xl bg-white/10 p-4">
                <p className="text-xs text-white/70">Your referral link</p>
                <p className="mt-1 break-all font-mono text-sm text-white">
                  {referralLink}
                </p>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(referralLink)}
                  className="mt-3 text-sm font-medium text-[#fcb900] underline"
                >
                  Copy link
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
