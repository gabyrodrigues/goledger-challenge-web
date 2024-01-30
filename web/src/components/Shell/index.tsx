"use client";
import Image from "next/image";
import Link from "next/link";
import { AppShell, Stack, UnstyledButton } from "@mantine/core";

import logo from "@/assets/img/logo-full.svg";
import { ActionsMenu } from "../ActionsMenu";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <AppShell
      navbar={{ width: 210, breakpoint: "sm" }}
      padding="md">
      <AppShell.Navbar
        withBorder={false}
        px={40}
        py={24}
        bg="var(--mantine-color-dark-9)">
        <Stack gap={20}>
          <Link href="/">
            <Image
              src={logo}
              alt="Logo Music Studio"
              className="w-28"
              priority
            />
          </Link>

          <UnstyledButton
            component={Link}
            href="/artists"
            fw="bold"
            p={4}
            classNames={{ root: "text-white rounded hover:bg-gray" }}>
            Artists
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            href="/albums"
            fw="bold"
            p={4}
            classNames={{ root: "text-white rounded hover:bg-gray" }}>
            Albums
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            href="/songs"
            fw="bold"
            p={4}
            classNames={{ root: "text-white rounded hover:bg-gray" }}>
            Songs
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            href="/playlists"
            fw="bold"
            p={4}
            classNames={{ root: "text-white rounded hover:bg-gray" }}>
            Playlists
          </UnstyledButton>

          <ActionsMenu />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
