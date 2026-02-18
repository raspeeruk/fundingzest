import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface Author {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  bio: string;
  expertise: string[];
  education: string;
  linkedin?: string;
}

const AUTHORS: Author[] = [
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    credentials: "CFP",
    title: "Certified Financial Planner",
    bio: "Sarah Mitchell is a Certified Financial Planner (CFP) with over 10 years of experience in personal finance and consumer lending. She specializes in helping consumers understand short-term lending products, compare loan options, and make informed borrowing decisions. Sarah reviews all financial content on FundingZest for accuracy, regulatory compliance, and consumer protection.",
    expertise: [
      "Personal finance and budgeting",
      "Consumer lending and credit products",
      "State lending regulations",
      "Financial literacy education",
      "Debt management strategies",
    ],
    education: "B.S. Finance, University of Michigan",
    linkedin: "https://linkedin.com",
  },
  {
    slug: "james-carter",
    name: "James Carter",
    credentials: "CFA",
    title: "Chartered Financial Analyst",
    bio: "James Carter is a Chartered Financial Analyst (CFA) with expertise in consumer credit markets, risk assessment, and financial product analysis. He brings 8 years of experience in financial services, including roles at consumer lending institutions and financial advisory firms. James contributes in-depth analyses of loan products, APR calculations, and market trends for FundingZest.",
    expertise: [
      "Consumer credit analysis",
      "APR and fee structure analysis",
      "Financial product comparison",
      "Risk assessment",
      "Market trend analysis",
    ],
    education: "M.B.A. Finance, NYU Stern School of Business",
    linkedin: "https://linkedin.com",
  },
  {
    slug: "maria-gonzalez",
    name: "Maria Gonzalez",
    credentials: "AFC",
    title: "Accredited Financial Counselor",
    bio: "Maria Gonzalez is an Accredited Financial Counselor (AFC) focused on consumer advocacy and financial education. With 7 years of experience counseling individuals on borrowing decisions, debt management, and financial planning, she ensures FundingZest's content prioritizes consumer interests. Maria is passionate about helping underserved communities access fair financial products.",
    expertise: [
      "Consumer financial counseling",
      "Debt management and repayment strategies",
      "Financial education and literacy",
      "Consumer protection regulations",
      "Underserved community financial access",
    ],
    education: "M.A. Financial Planning, Kansas State University",
    linkedin: "https://linkedin.com",
  },
];

function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  return createMetadata({
    title: `${author.name}, ${author.credentials} - Author`,
    description: `${author.name} is a ${author.title} who reviews and contributes financial content for FundingZest. Learn about their qualifications and expertise.`,
    path: `/authors/${author.slug}`,
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `https://fundingzest.com/authors/${author.slug}`,
    worksFor: {
      "@type": "Organization",
      name: "FundingZest",
      url: "https://fundingzest.com",
    },
    knowsAbout: author.expertise,
    alumniOf: author.education,
    ...(author.linkedin && {
      sameAs: [author.linkedin],
    }),
  };

  return (
    <>
      <JsonLd data={personSchema} />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: author.name, href: `/authors/${author.slug}` }]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {author.name}
              </h1>
              <p className="text-lg text-green-700">{author.title}</p>
              <p className="text-sm text-gray-500">{author.education}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">About</h2>
            <p>{author.bio}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Areas of Expertise
            </h2>
            <ul className="space-y-2">
              {author.expertise.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-600">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Editorial Role
            </h2>
            <p>
              {author.name} reviews financial content published on FundingZest
              to ensure accuracy, regulatory compliance, and consumer
              protection. All loan-related information, APR ranges, fee
              structures, and state regulation details are verified before
              publication.
            </p>
            <p className="mt-3">
              Learn more about our content standards in our{" "}
              <Link
                href="/editorial-guidelines"
                className="text-green-700 underline"
              >
                editorial guidelines
              </Link>
              .
            </p>
          </section>

          {author.linkedin && (
            <section>
              <h2 className="mb-3 text-xl font-bold text-gray-900">Connect</h2>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-700 underline"
              >
                LinkedIn Profile
              </a>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
