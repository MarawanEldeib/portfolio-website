import type { Metadata } from "next";

// This file is required for the app directory structure
// The actual layout is in app/[locale]/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.vercel.app'),
  title: {
    default: "Marawan Eldeib - Software Engineering Student & AI Developer",
    template: "%s | Marawan Eldeib"
  },
  description: "Master's student in Software Engineering at Stuttgart University with 3+ years of experience in AI, machine learning, and full-stack development. Former Research Assistant at Fraunhofer IOSB specializing in computer vision and deep learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
