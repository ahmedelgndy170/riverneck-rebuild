import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#101010] font-sans text-white">
        {children}
      </body>
    </html>
  );
}