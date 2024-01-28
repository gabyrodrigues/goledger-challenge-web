import { Stack } from "@mantine/core";

import { AlbumsSection } from "@/components/AlbumsSection";
import { InfoCard } from "@/components/InfoCard";
import { SongsSection } from "@/components/SongsSection";

export default function ArtistId() {
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

  const albums = [
    {
      id: "dsljf9384fkdjg9030jkdv",
      title: "Don't Forget"
    },
    {
      id: "4uoigjfi5u4gjh490gh904",
      title: "Tell Me You Love Me"
    },
    {
      id: "dsgd54gfdg45rg6ygd356578",
      title: "Unbroken"
    }
  ];

  return (
    <Stack className="gap-8">
      <InfoCard
        type="artist"
        artist={{
          name: "Demi Lovato",
          about:
            "Demetria 'Demi' Devonne Lovato é uma cantora, compositora e atriz. Multipremiada e indicada em diversos prêmios e possui hits em diversos gêneros musicais, como Pop, Rock e R&B."
        }}
      />

      <SongsSection items={songs} />

      <AlbumsSection items={albums} />
    </Stack>
  );
}
