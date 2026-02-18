import Link from "next/link";

const NAV_ITEMS = [
  { label: "Borrow", href: "/borrow" },
  { label: "Loan Types", href: "/loans" },
  { label: "States", href: "/states" },
  { label: "Guides", href: "/guides" },
  { label: "Calculator", href: "/calculator" },
];

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-700">FundingZest</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-green-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/apply"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
          >
            Apply Now
          </Link>
          <Link
            href="/advertiser-disclosure"
            className="hidden text-xs text-gray-400 underline sm:inline"
          >
            Advertiser Disclosure
          </Link>
        </div>
      </div>

      {/* Disclosure banner */}
      <div className="bg-gray-50 px-4 py-1.5 text-center text-xs text-gray-500">
        FundingZest may receive compensation when you click on links to our
        lender partners.{" "}
        <Link href="/advertiser-disclosure" className="underline">
          Learn more
        </Link>
      </div>
    </header>
  );
}
