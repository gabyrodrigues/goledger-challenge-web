"use client";
import { ArtistForm } from "@/forms/Artist";
import { Stack, Title } from "@mantine/core";

export default function NewArtist() {
  return (
    <Stack gap={32}>
      <Title order={1}>Create New Artist</Title>
      <ArtistForm />
    </Stack>
  );
}
