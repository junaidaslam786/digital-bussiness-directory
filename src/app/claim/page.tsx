"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Building2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/categories.mock";

const claimBusinessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  legalName: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  yourName: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  position: z.string().min(2, "Your position is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter a complete address"),
  city: z.string().min(2, "City is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  proofOfOwnership: z.string().min(10, "Please explain how you can verify ownership"),
});

type ClaimBusinessForm = z.infer<typeof claimBusinessSchema>;

export default function ClaimBusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClaimBusinessForm>({
    resolver: zodResolver(claimBusinessSchema),
  });

  const onSubmit = async (data: ClaimBusinessForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Claim submitted:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Claim Business", href: "/claim" },
          ]}
        />

        <Card className="mx-auto mt-8 max-w-2xl">
          <CardContent className="py-12 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Claim Submitted Successfully!
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Thank you for claiming your business. Our team will review your submission and
              contact you within 2-3 business days.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => setSubmitted(false)}>Submit Another Claim</Button>
              <a href="/">
                <Button variant="outline">Back to Home</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Claim Business", href: "/claim" },
        ]}
      />

      <div className="mb-8 mt-4">
        <div className="flex items-center space-x-3">
          <Building2 className="h-10 w-10 text-gray-900 dark:text-white" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Claim Your Business
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Take control of your business listing and reach more customers
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Update Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep your business details, hours, and contact information up to date
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Respond to Reviews
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Engage with customers and respond to their feedback
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Get Verified
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Earn a verified badge to build trust with potential customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Claim Form */}
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Business Claim Form</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please provide accurate information to verify your ownership
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Information */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Business Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Name *
                  </label>
                  <Input {...register("businessName")} placeholder="Your Business Name" />
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Legal Business Name
                  </label>
                  <Input
                    {...register("legalName")}
                    placeholder="Official registered name (if different)"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Website
                  </label>
                  <Input
                    {...register("website")}
                    type="url"
                    placeholder="https://yourbusiness.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Street Address *
                  </label>
                  <Input {...register("address")} placeholder="123 Business Street" />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City *
                  </label>
                  <Input {...register("city")} placeholder="Seoul" />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Description *
                  </label>
                  <Textarea
                    {...register("description")}
                    rows={4}
                    placeholder="Tell us about your business, services, and what makes you unique..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Your Information */}
            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Your Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Full Name *
                  </label>
                  <Input {...register("yourName")} placeholder="John Doe" />
                  {errors.yourName && (
                    <p className="mt-1 text-sm text-red-600">{errors.yourName.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="john@business.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number *
                  </label>
                  <Input {...register("phone")} type="tel" placeholder="02-1234-5678" />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Position *
                  </label>
                  <Input {...register("position")} placeholder="Owner, Manager, etc." />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Proof of Ownership
              </h3>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  How can you verify ownership? *
                </label>
                <Textarea
                  {...register("proofOfOwnership")}
                  rows={4}
                  placeholder="Describe how you can prove ownership (business license, tax documents, official email address, etc.)"
                />
                {errors.proofOfOwnership && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.proofOfOwnership.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-4 border-t border-gray-200 pt-6 dark:border-gray-800">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Clear Form
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Claim"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
