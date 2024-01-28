import { Container } from "@mantine/core";

import { AlbumsSection } from "@/components/AlbumsSection";
import { ArtistsSection } from "@/components/ArtistsSection";
import { SongsSection } from "@/components/SongsSection";
import { PlaylistsSection } from "@/components/PlaylistsSection";

export default function Home() {
  return (
    <Container
      size="lg"
      className="flex flex-col px-10 py-16 gap-8">
      <SongsSection
        items={[
          {
            id: "dsljf9384fkdjg9030jkdv",
            title: "Sorry Not Sorry",
            artist: "Demi Lovato"
          },
          {
            id: "4uoigjfi5u4gjh490gh904",
            title: "Don't Forget",
            artist: "Demi Lovato"
          },
          {
            id: "dsgd54gfdg45rg6ygd356578",
            title: "Only Forever",
            artist: "Demi Lovato"
          },
          {
            id: "fgfh4656vvg45656vgfg5",
            title: "The Art Of Starting Over",
            artist: "Demi Lovato"
          }
        ]}
      />

      <AlbumsSection
        items={[
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
        ]}
      />

      <ArtistsSection
        items={[
          {
            id: "dsljf9384fkdjg9030jkdv",
            name: "Demi Lovato"
          },
          {
            id: "4uoigjfi5u4gjh490gh904",
            name: "Hayley Kiyoko"
          },
          {
            id: "dsgd54gfdg45rg6ygd356578",
            name: "Marina and the Diamonds"
          }
        ]}
      />

      <PlaylistsSection
        items={[
          {
            id: "dsljf9384fkdjg9030jkdv",
            title: "Dance Hits"
          },
          {
            id: "4uoigjfi5u4gjh490gh904",
            title: "Bubble Pop"
          },
          {
            id: "dsgd54gfdg45rg6ygd356578",
            title: "Cardio Songs"
          }
        ]}
      />
    </Container>
  );
}
