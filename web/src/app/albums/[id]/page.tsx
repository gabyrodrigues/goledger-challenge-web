import { Stack } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { Song } from "@/components/Song";

export default function AlbumId() {
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
        type="album"
        album={{
          title: "Tell Me You Love Me",
          artist: "Demi Lovato",
          releaseDate: "2008-09-23T03:00:00Z",
          rating: 10
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
