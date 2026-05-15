"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin");
}

export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showChrome = !isAdminPath(pathname);

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7524/ingest/cc02ad09-dcc3-49c2-83b0-4cf473b00434", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "21de5f",
      },
      body: JSON.stringify({
        sessionId: "21de5f",
        location: "PublicShell.tsx:pathname",
        message: "public chrome decision",
        data: { pathname, showChrome, rendersHeader: showChrome, rendersFooter: showChrome },
        timestamp: Date.now(),
        hypothesisId: "C",
      }),
    }).catch(() => {});
    // #endregion
  }, [pathname, showChrome]);

  if (!showChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}
