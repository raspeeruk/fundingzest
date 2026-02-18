interface BLUFSummaryProps {
  amount: string;
  minApr: number;
  maxApr: number;
  fundingTime: string;
  badCreditOk: boolean;
}

export function BLUFSummary({
  amount,
  minApr,
  maxApr,
  fundingTime,
  badCreditOk,
}: BLUFSummaryProps) {
  return (
    <div
      className="mb-8 rounded-lg border-l-4 border-green-600 bg-green-50 p-5"
      role="region"
      aria-label="Quick Summary"
    >
      <p className="mb-2 text-lg font-semibold text-green-800">Bottom Line</p>
      <p className="text-gray-700">
        You can borrow {amount} through FundingZest&apos;s lender network with
        APRs from {minApr}% to {maxApr}%. Approval decisions in minutes. Funds
        available {fundingTime}.
        {badCreditOk && " Bad credit and no credit history considered."}
      </p>
    </div>
  );
}
