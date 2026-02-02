import type { Metadata } from "next";
import { Poppins, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Enlighten Vibes | Creative Content & Communications Agency",
    template: "%s | Enlighten Vibes",
  },
  description:
    "Enlighten Vibes is a multidisciplinary creative agency specialising in strategic content, visual design, digital platforms, moving image, and experiential delivery. Based in Dhaka, Bangladesh.",
  keywords: [
    "Enlighten Vibes",
    "creative agency",
    "content agency",
    "communications agency",
    "strategic content",
    "visual design",
    "digital platforms",
    "moving image",
    "experiential delivery",
    "web design",
    "video production",
    "event production",
    "branding",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: "Enlighten Vibes" }],
  creator: "Enlighten Vibes",
  publisher: "Enlighten Vibes",
  metadataBase: new URL("https://enlightenvibes.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Enlighten Vibes",
    title: "Enlighten Vibes | Creative Content & Communications Agency",
    description:
      "Multidisciplinary creative agency specialising in strategic content, visual design, digital platforms, moving image, and experiential delivery.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Enlighten Vibes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enlighten Vibes | Creative Content & Communications Agency",
    description:
      "Multidisciplinary creative agency specialising in strategic content, visual design, digital platforms, moving image, and experiential delivery.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${poppins.variable} ${anton.variable} font-sans antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
