import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { toPlainText, VisualEditing } from "next-sanity";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { Toaster } from "sonner";

import { handleError } from "@/app/client-utils";
import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Provider from "@/provider";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    other: {
      "google-site-verification": "ROkX_3h6GmznkptWn_YfVrVbbVjEyz49cKYfBHyxICw",
      "naver-site-verification": "78a02469f59bca55cb7625d2334d6d4844debc34",
    },
  };
}

const FourtyTwoDot = localFont({
  src: "../public/fonts/42dotSans-VariableFont_wght.woff2",
  variable: "--font-42dots",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${FourtyTwoDot.variable} bg-white text-black font-42dots antialiased`}
    >
      <body>
        <Provider>
          <section className="min-h-screen pt-24">
            {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
            <Toaster />
            {isDraftMode && (
              <>
                <DraftModeToast />
                {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
                <VisualEditing />
              </>
            )}
            {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
            <SanityLive onError={handleError} />
            <Header />
            <main className="">{children}</main>
            <Footer />
          </section>
          <SpeedInsights />
        </Provider>
      </body>
      <GoogleAnalytics gaId={"G-NL9TPL7XTE"} />
    </html>
  );
}
