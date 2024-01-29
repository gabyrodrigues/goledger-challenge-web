import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { ColorSchemeScript, Container, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { Shell } from "@/components/Shell";
import { cn } from "@/utils";
import { AppContexts } from "@/contexts/AppContexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Studio",
  description: "A streaming web app developed with Typescript, React, NextJS and Tailwind CSS",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/icon-512.png",
    apple: "/img/icon-512.png"
  },
  manifest: "/manifest.json"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn("bg-background text-white", inter.className)}>
        <MantineProvider defaultColorScheme="dark">
          <Notifications />
          <AppContexts>
            <Shell>
              <Container
                size="lg"
                className="flex flex-col px-10 py-16 gap-8">
                {children}
              </Container>
            </Shell>
          </AppContexts>
        </MantineProvider>
      </body>
    </html>
  );
}
