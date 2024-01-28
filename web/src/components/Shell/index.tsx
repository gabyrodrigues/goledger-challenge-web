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
      <AppShell.Navbar className="bg-darkGray border-0 py-6 px-10">
        <Stack className="gap-5">
          <Image
            src={logo}
            alt="Logo Music Studio"
            className="w-28"
          />

          <UnstyledButton
            component={Link}
            href="/"
            className="text-base text-white font-bold">
            Artists
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            href="/"
            className="text-base text-white font-bold">
            Albums
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            href="/"
            className="text-base text-white font-bold">
            Songs
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            href="/"
            className="text-base text-white font-bold">
            Playlists
          </UnstyledButton>

          <ActionsMenu />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
