import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverneckacresatv.com"),

  title: "River Neck Acres ATV Park & Campground",

  description:
    "60+ miles of off-road freedom. Ride, camp, explore trails, events, cabins, memberships and more at River Neck Acres ATV Park & Campground.",

  keywords: [
    "River Neck Acres",
    "ATV Park",
    "UTV Trails",
    "Mud Park",
    "Camping",
    "Off Road",
    "South Carolina ATV Park",
    "Florence SC",
  ],

  openGraph: {
    title: "River Neck Acres ATV Park & Campground",

    description:
      "Ride. Camp. Fall in Love. Experience 60+ miles of off-road adventure at River Neck Acres.",

    images: ["/hero.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#101010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#101010] font-sans text-white selection:bg-[#f2c06b] selection:text-black">
        <CartProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}