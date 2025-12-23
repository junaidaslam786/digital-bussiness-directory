import { Metadata } from "next";

export function generateMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export function generateEnterpriseJsonLd(enterprise: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: enterprise.name,
    description: enterprise.description,
    image: enterprise.gallery[0]?.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: enterprise.address.street,
      addressLocality: enterprise.address.city,
      addressCountry: enterprise.address.country,
      postalCode: enterprise.address.postalCode,
    },
    telephone: enterprise.contact.phone,
    email: enterprise.contact.email,
    url: enterprise.contact.website,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: enterprise.ratingAvg,
      reviewCount: enterprise.ratingCount,
    },
  };
}
