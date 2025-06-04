import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import "@/public/fonts/matter/stylesheet.css";
import "@/public/fonts/polysans/stylesheet.css";
import { UserProvider } from "@/redux/userContext";
import { NextUIProvider } from "@nextui-org/react";
import { Suspense } from "react";
import { I18nProviderClient } from "@/locales/client";

export const metadata = {
  title: "Admin-Dashboard",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <I18nProviderClient locale={params.locale}>
            <NextUIProvider>
              <UserProvider>
                {children}
                <Toaster />
              </UserProvider>
            </NextUIProvider>
          </I18nProviderClient>
        </Suspense>
      </body>
    </html>
  );
}
