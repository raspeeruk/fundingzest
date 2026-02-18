import { JsonLd } from "./JsonLd";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FundingZest",
    url: "https://fundingzest.com",
    logo: "https://fundingzest.com/images/logos/fundingzest-logo.png",
    description:
      "FundingZest is a loan comparison service that connects borrowers with lenders. Compare personal loans, payday loans, and more.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://fundingzest.com/contact",
    },
    sameAs: [],
  };

  return <JsonLd data={data} />;
}
