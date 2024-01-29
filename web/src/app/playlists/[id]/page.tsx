"use client";
import { Stack } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { Song } from "@/components/Song";

export default function PlaylistId() {
  const songs = [
    {
      id: "dsljf9384fkdjg9030jkdv",
      title: "Sorry Not Sorry",
      artists: ["Demi Lovato"]
    },
    {
      id: "4uoigjfi5u4gjh490gh904",
      title: "Don't Forget",
      artists: ["Demi Lovato"]
    },
    {
      id: "dsgd54gfdg45rg6ygd356578",
      title: "Only Forever",
      artists: ["Demi Lovato"]
    },
    {
      id: "fgfh4656vvg45656vgfg5",
      title: "The Art Of Starting Over",
      artists: ["Demi Lovato"]
    }
  ];

  return (
    <Stack className="gap-8">
      <InfoCard
        type="playlist"
        playlist={{
          name: "Bubble Pop",
          description: "The greatest pop hits to listen anywhere and anytime."
        }}
      />

      <Stack className="gap-2">
        {songs.map((song) => (
          <Song
            key={song.id}
            id={song.id}
            title={song.title}
            artists={["Demi Lovato"]}
          />
        ))}
      </Stack>
    </Stack>
  );
}
