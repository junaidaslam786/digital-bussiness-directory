import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, Globe, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Enterprise } from "@/types";
import { formatPhoneNumber } from "@/lib/format";

interface ContactPanelProps {
  enterprise: Enterprise;
}

export function ContactPanel({ enterprise }: ContactPanelProps) {
  const { contact, address } = enterprise;

  const socialIcons: Record<string, any> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    x: Twitter,
    twitter: Twitter,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Phone */}
        {contact.phone && (
          <div className="flex items-start space-x-3">
            <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <a
                href={`tel:${contact.phone}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {formatPhoneNumber(contact.phone)}
              </a>
            </div>
          </div>
        )}

        {/* Email */}
        {contact.email && (
          <div className="flex items-start space-x-3">
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-blue-600 hover:underline dark:text-blue-400"
              >
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {/* Website */}
        {contact.website && (
          <div className="flex items-start space-x-3">
            <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Website
              </p>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline dark:text-blue-400"
              >
                {contact.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        )}

        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Address
            </p>
            <p className="text-gray-900 dark:text-white">
              {address.street}
              {address.district && `, ${address.district}`}
              <br />
              {address.city}, {address.country}
              {address.postalCode && ` ${address.postalCode}`}
            </p>
          </div>
        </div>

        {/* Social Links */}
        {contact.socials && contact.socials.length > 0 && (
          <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
            <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Social Media
            </p>
            <div className="flex flex-wrap gap-2">
              {contact.socials.map((social, index) => {
                const Icon = socialIcons[social.type] || Globe;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
          {contact.phone && (
            <Button className="w-full" asChild>
              <a href={`tel:${contact.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          )}
          {contact.website && (
            <Button variant="outline" className="w-full" asChild>
              <a href={contact.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
