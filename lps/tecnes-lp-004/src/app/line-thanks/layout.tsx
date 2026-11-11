import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LINEに移動しています…｜TECNES 採用",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LineThanksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
