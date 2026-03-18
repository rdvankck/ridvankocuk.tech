import { SITE_CONFIG } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: "Full Stack Software Engineer",
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedin,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
