import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@/styles/globals.css";

import { ColorSchemeScript, Container, MantineProvider, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { Shell } from "@/components/Shell";
import { AppContexts } from "@/contexts/AppContexts";
import { theme } from "@/styles/theme";

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
      <body className={inter.className}>
        <MantineProvider
          theme={theme}
          defaultColorScheme="dark">
          <Notifications />
          <AppContexts>
            <Shell>
              <Container
                size="lg"
                px={40}
                py={64}>
                <Stack gap={32}>{children}</Stack>
              </Container>
            </Shell>
          </AppContexts>
        </MantineProvider>
      </body>
    </html>
  );
}
