"use client";
import Image from "next/image";
import Link from "next/link";
import { AppShell, Stack, Button } from "@mantine/core";

import logo from "@/assets/img/logo-full.svg";
import { ActionsMenu } from "../ActionsMenu";
interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <AppShell
      navbar={{ width: 210, breakpoint: "sm" }}
      padding="md"
      bg="var(--mantine-color-dark-9)">
      <AppShell.Navbar
        withBorder={false}
        px={40}
        py={24}
        bg="var(--mantine-color-dark-8)">
        <Stack gap={20}>
          <Link href="/">
            <Image
              src={logo}
              alt="Logo Music Studio"
              className="w-28"
              priority
            />
          </Link>

          <Button
            variant="subtle"
            component={Link}
            href="/artists"
            fw="bold"
            fz="md"
            justify="flex-start"
            p={4}>
            Artists
          </Button>
          <Button
            variant="subtle"
            component={Link}
            href="/albums"
            fw="bold"
            fz="md"
            justify="flex-start"
            p={4}>
            Albums
          </Button>
          <Button
            variant="subtle"
            component={Link}
            href="/songs"
            fw="bold"
            fz="md"
            justify="flex-start"
            p={4}>
            Songs
          </Button>
          <Button
            variant="subtle"
            component={Link}
            href="/playlists"
            fw="bold"
            fz="md"
            justify="flex-start"
            p={4}>
            Playlists
          </Button>

          <ActionsMenu />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
