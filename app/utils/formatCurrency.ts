interface iAppProps {
  amount: number;
  // currency: string
  currency: "IDR" | "USD";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  const locale = currency === "IDR" ? "id-ID" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
